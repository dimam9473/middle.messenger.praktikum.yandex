import { v4 as uuidv4, } from 'uuid';
import Handlebars from 'handlebars'

import EventBus from '../../utils/eventBus';

// eslint-disable-next-line
class Block<P extends Record<string, unknown> = any> {
    static EVENTS = {
        'INIT': 'init',
        'FLOW_CDM': 'flow:component-did-mount',
        'FLOW_CDU': 'flow:component-did-update',
        'FLOW_RENDER': 'flow:render',
    } as const;

    private _eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _isActivePage = false

    protected props: P;

    public id = uuidv4();
    public children: Record<string, Block | Block[]>;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(propsWithChildren?: P) {
        const eventBus = new EventBus();
        const { props, children, } = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);
        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents() {
        const { events = {}, } = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    private _getChildrenAndProps(childrenAndProps?: P): { props: P, children: Record<string, Block | Block[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        if (childrenAndProps) {
            Object.entries(childrenAndProps).forEach(([key, value,]) => {
                const isComponentsList = Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)
                const isComponent = value instanceof Block
                if (isComponentsList || isComponent) {
                    children[key as string] = value;
                } else {
                    props[key] = value;
                }
            });
        }

        return { 'props': props as P, children, };
    }

    private _init() {
        this.init();

        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _makePropsProxy(props: P) {
        // eslint-disable-next-line
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target, }

                target[prop as keyof P] = value;

                self._isActivePage && self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    private _removeEvents() {
        const { events = {}, } = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _render() {
        const fragment = this.render();

        const newElement = fragment.firstElementChild as HTMLElement;
        this._removeEvents();

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();

        this._isActivePage = true
    }

    // eslint-disable-next-line
    protected compile(template: string, context: any) {
        const contextAndStubs = { ...context, };

        Object.entries(this.children).forEach(([name, component,]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = Handlebars.compile(template)(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        const replaceStub = (component: Block) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent());
        }

        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        Object.entries(this.children).forEach(([_, component,]) => {
            if (Array.isArray(component)) {
                component.forEach(replaceStub);
            } else {
                replaceStub(component);
            }
        });

        return temp.content;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected componentDidMount() {
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    protected componentDidUpdate(_oldProps: P, _newProps: P) {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected init() {
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    public dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(ch => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    public getContent() {
        return this.element as HTMLElement;
    }

    public hide() {
        this.getContent().classList.add('hide')
        this._isActivePage = false
    }

    public setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    public show() {
        this._isActivePage = true
        this.getContent().classList.remove('hide')
    }

    get element() {
        return this._element;
    }
}

export default Block;
