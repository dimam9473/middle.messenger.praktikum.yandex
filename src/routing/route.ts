import { Block, } from '../components';
import { RouteProps, } from '../types/route';
import { isEqual, } from '../utils/isEqual';
import { render, } from '../utils/render';

class Route {
    private _pathName?: string
    private _blockClass?: typeof Block
    private _block?: Block | null
    private _props?: RouteProps

    constructor(pathName: string, view: typeof Block, props: RouteProps) {
        this._pathName = pathName;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathName: string) {
        if (this.match(pathName)) {
            this._pathName = pathName;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathName: string) {
        return isEqual(pathName, this._pathName);
    }

    render() {
        if (!this._block) {
            if (!this._blockClass) {
                throw new Error('Block does not specified')
            }

            this._block = new this._blockClass();

            if (this._props?.rootQuery === undefined) {
                throw new Error('Root query does not specified')
            }

            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export default Route
