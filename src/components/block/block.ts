import EventBus from "../../utils/eventBus";
import { getTypeKey } from "../../utils/getKey";

type Meta<T> = {
    tagName: string
    props: T | undefined
} | null

type BlockEventBuss = () => EventBus

class Block<T extends object> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    private _meta: Meta<T> = null;
    props: any
    eventBus: BlockEventBuss

    constructor(tagName = "div", props?: T) {
        const eventBus = EventBus.getInstance();
        this._meta = {
            tagName,
            props
        };
        if (props) {
            this.props = this._makePropsProxy(props);
        }

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        if (!this._meta) {
            return
        }

        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() { }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        return true;
    }

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        if (!this._element) {
            return
        }

        const block = this.render();
        this._element.innerHTML = block;
    }

    render(): string {
        return ''
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: T) {
        const self = this;

        return new Proxy<T>(props, {
            get(target: typeof props, prop: string) {
                const key = getTypeKey<T>(prop)
                const value = target[key];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: typeof props, prop: string, value) {
                const key = getTypeKey<T>(prop)
                target[key] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        const content = this.getContent()
        if (!content) {
            return
        }

        content.style.display = "block";
    }

    hide() {
        const content = this.getContent()
        if (!content) {
            return
        }

        content.style.display = "none";
    }
}

export default Block
