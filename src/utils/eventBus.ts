import { Listener, } from '../types/listener';
import { getTypeKey, } from './getKey';

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

    on(event: string, callback: Function) {
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

    emit(event: string, ...args: unknown[]) {
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
