import { Block, } from '../components';
import { StoreProps, } from '../types/store';
import { isEqual, } from '../utils/isEqual';
import store, { StoreEvents, } from './store';

// eslint-disable-next-line no-unused-vars
type MapeStateProps = (state: StoreProps) => StoreProps

export function connect(mapStateToProps: MapeStateProps) {
    return function (Component: typeof Block) {
        return class extends Component {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            constructor(props: any) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state, });

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState, });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        }
    }
}
