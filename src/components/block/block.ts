import Handlebars from "handlebars"
import { v4 as uuidv4 } from 'uuid';

import EventBus from "../../utils/eventBus";

type BlockEventBuss = () => EventBus

type Children = { [key: string]: Block | Block[] }

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    private _id
    props: any
    children: Children
    eventBus: BlockEventBuss

    constructor(propsAndChildren?: unknown) {
        const eventBus = EventBus.getInstance();
        const { children, props } = this._getChildren(propsAndChildren)

        this.children = children || {};
        this._id = uuidv4()
        if (props) {
            this.props = this._makePropsProxy({ ...props, _id: this._id });
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

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    _getChildren(propsAndChildren?: unknown): { children?: Children, props?: object } {
        if (!propsAndChildren) {
            return {}
        }

        const children: Record<string, Block | Block[]> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            const isComponentList = Array.isArray(value) && value.every(item => item instanceof Block)
            if (value instanceof Block || isComponentList) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();

        if (!this.children) {
            return
        }

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(item => { item.dispatchComponentDidMount() })
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    componentDidMount() { }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: object, newProps: object) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: object, newProps: object) {
        return true;
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        if (!this._element) {
            this._element = block;
        } else {
            this._element.innerHTML = '';
        }

        if (!this._element) {
            return
        }

        this._removeEvents();

        this._element = block;

        this._addEvents();
    }

    render(): any {
        return ''
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Record<string, unknown>) {
        const self = this;

        return new Proxy(props, {
            get(target: typeof props, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: typeof props, prop: string, value) {
                target[prop] = value;

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

    compile(template: string, props?: object) {
        const propsAndStubs: Record<string, string | string[]> = { ...props };

        if (!this.children) {
            return
        }

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    if (!propsAndStubs[key]) {
                        propsAndStubs[key] = []
                    }
                    (propsAndStubs[key] as Array<string>).push(`<div data-id="${item._id}"></div>`)
                })
            } else {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`
            }
        });

        const fragment = (this._createDocumentElement('template')) as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    const stub = fragment.content.querySelector(`[data-id="${item._id}"]`);
                    const content = item.getContent()
                    stub?.replaceWith(content || '');
                })
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
                const content = child.getContent()
                stub?.replaceWith(content || '');
            }
        });

        return fragment.content.firstElementChild;
    }
}

export default Block
