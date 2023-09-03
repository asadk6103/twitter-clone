import Icons from '../../common/icons';
import Dashboard from '../../screens/Dashboard';
import Profile from '../../screens/Profile';

export const LOGIN_ROUTE = '/';

export const ROUTES = {
    dashboard: 'home',
    profile: 'profile',
};

export const ROLES = {
    admin: 'admin',
    ai: 'ai'
};

export const APP_ROUTES = [
    {
        label: ROUTES.dashboard,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.dashboard}`,
        isProtected: true,
        // permission: ROUTES.dashboard,
        // roles: [ROLES.admin, ROLES.ai],
        screen: Dashboard,
        showInNav: true,
    },
    {
        label: ROUTES.profile,
        icon: Icons.Person,
        redirectPath: "/",
        url: `/${ROUTES.profile}`,
        isProtected: true,
        // permission: ROUTES.dashboard,
        // roles: [ROLES.admin, ROLES.ai],
        screen: Profile,
        showInNav: true,
    },
];