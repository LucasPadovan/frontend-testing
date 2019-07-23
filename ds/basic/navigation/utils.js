import { MINIMAL_MENU_ENABLED } from '../../settings/flags';

import { MENU_KEYS } from './constants';

const _getMenuItems = (resourceId) => (
    [
        {
            title: 'JUEGOS',
            link: '/admin/games',
            key: MENU_KEYS.games,
            subMenuItems: [
                {
                    title: 'Información',
                    link: `/admin/games/${resourceId}/info`,
                    key: MENU_KEYS.info,
                },
            ],
        },
    ]
);

const _getManagerMenuItems = () => (
    [
        {
            title: 'Design System',
            link: '/manager/ds',
            key: MENU_KEYS.ds,
        },
    ]
);

const ENABLED_MENU_ITEMS = [MENU_KEYS.games];

export const getMenuItems = (resourceId) => {
    let menuItems = _getMenuItems(resourceId);

    if (MINIMAL_MENU_ENABLED) {
        menuItems = menuItems.filter(({ key }) => (ENABLED_MENU_ITEMS.includes(key)));
    }

    return menuItems;
};

export const getManagerMenuItems = (resourceId) => (
    _getManagerMenuItems(resourceId)
);
