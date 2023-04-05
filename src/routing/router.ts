import { Block, } from '../components';
import { Login, Profile, } from '../pages';
import Route from './route';

class Router {
    private static _instance: Router;
    private _currentRoute?: Route | null;
    private _rootQuery?: string;

    public history?: History
    public routes?: Route[]

    constructor(rootQuery: string) {
        if (Router._instance) {
            return Router._instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router._instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { 'rootQuery': this._rootQuery || '', });

        this.routes?.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            this._onRoute(event.currentTarget?.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathName: string) {
        const route = this.getRoute(pathName);
        if (!route) {
            return;
        }

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
        return this.routes?.find(route => route.match(pathName));
    }
}

export default Router
// Необходимо оставить в силу особенностей тренажёра
// history.pushState({}, '', '/');

const router = new Router('.app');

// Можно обновиться на /user и получить сразу пользователя
router
    .use('/', Login)
    .use('/users', Profile)
    .start();

// Через секунду контент изменится сам, достаточно дёрнуть переход
setTimeout(() => {
    router.go('/users');
}, 1000);

// А можно и назад
setTimeout(() => {
    router.back();
}, 3000);

// И снова вперёд
setTimeout(() => {
    router.forward();
}, 5000);
