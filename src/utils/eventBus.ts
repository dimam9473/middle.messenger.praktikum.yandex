import { getTypeKey } from "./getKey";

type Listener = {
    [key: string]: Function[]
}

class EventBus {
    private static instance?: EventBus = undefined;
    private listeners: Listener

    constructor() {
        this.listeners = {};
    }

    public static getInstance(): EventBus {
        if (this.instance === undefined) {
            this.instance = new EventBus();
        }

        return this.instance;
    }

    on<T>(event: string, callback: Function) {
        const key = getTypeKey<Listener>(event)

        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }

        this.listeners[key].push(callback);
    }

    off(event: string, callback: Function) {
        const key = getTypeKey<Listener>(event)

        if (!this.listeners[key]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[key] = this.listeners[key].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: any[]) {
        const key = getTypeKey<Listener>(event)

        if (!this.listeners[key]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[key].forEach(listener => {
            listener(...args);
        });
    }
}

export default EventBus
