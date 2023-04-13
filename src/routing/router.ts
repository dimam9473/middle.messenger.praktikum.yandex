import { Block, } from '../components';
import { NotFoundError, } from '../pages';

import { Routes, } from '../constants/routes'
import Route from './route';

class Router {
    private static _instance: Router;
    private _currentRoute!: Route | null;
    private _rootQuery!: string;
    private _notFoundRoute!: Route

    public history!: History
    public routes!: Route[]

    constructor(rootQuery: string) {
        if (Router._instance) {
            return Router._instance;
        }

        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._notFoundRoute = new Route(Routes.notFoundError, NotFoundError, { 'rootQuery': this._rootQuery, })
        this.routes = []

        Router._instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { 'rootQuery': this._rootQuery, });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget as Window
            this._onRoute(target.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathName: string) {
        const route = this.getRoute(pathName);

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathName: string) {
        this.history?.pushState({}, '', pathName);
        this._onRoute(pathName);
    }

    back() {
        this.history?.back();
    }

    forward() {
        this.history?.forward();
    }

    getRoute(pathName: string) {
        return this.routes?.find(route => route.match(pathName)) || this._notFoundRoute;
    }
}

export default Router
