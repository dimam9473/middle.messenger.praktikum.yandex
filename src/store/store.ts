import { StoreProps, } from '../types/store';
import EventBus from '../utils/eventBus';

export enum StoreEvents {
    // eslint-disable-next-line no-unused-vars
    Updated = 'updated',
}

class Store extends EventBus {
    private state: StoreProps = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        this.state[path] = value;
        this.emit(StoreEvents.Updated);
    }
}

export default new Store();
