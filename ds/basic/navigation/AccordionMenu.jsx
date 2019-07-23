import React, { PureComponent } from 'react';
import classNames from 'classnames';

import Button from '../Button';

import './AccordionMenu.scss';

const SubMenuItems = ({ items, currentSubSection }) => (
    items.map(({
        title,
        onClick,
        link = '#',
        key,
    }, index) => {
        const isCurrentSubSection = key === currentSubSection;
        const menuItemClassNames = classNames(
            'accordion-menu__item accordion-menu__sub-item',
            {
                'accordion-menu__item--active': isCurrentSubSection,
            },
        );

        return (
            <div className={menuItemClassNames} key={`menu-item-secondary-${index}`}>
                <Button
                    type="link"
                    className="accordion-menu__link"
                    onClick={onClick}
                    to={link}
                    text={title}
                />
            </div>
        );
    })
);

const MenuItems = ({ items, currentSection, currentSubSection }) => (
    items.map(({
        title,
        onClick,
        link = '#',
        key,
        subMenuItems = [],
    }, index) => {
        const isCurrentSection = key === currentSection;
        const shouldShowSubMenu = subMenuItems.length && isCurrentSection && currentSubSection;
        const menuItemClassNames = classNames(
            'accordion-menu__item p-3',
            {
                'accordion-menu__item--active': isCurrentSection,
            },
        );
        let subMenuComponent = null;

        if (shouldShowSubMenu) {
            subMenuComponent = (
                <SubMenuItems items={subMenuItems} currentSubSection={currentSubSection} />
            );
        }

        return (
            <div className={menuItemClassNames} key={`menu-item-${index}`}>
                <Button
                    type="link"
                    className="accordion-menu__link"
                    onClick={onClick}
                    to={link}
                    text={title}
                />

                {subMenuComponent}
            </div>
        );
    })
);

export default class AccordionMenu extends PureComponent {
    render() {
        const {
            items,
            isOpen,
            currentSection,
            currentSubSection,
        } = this.props;
        const componentClassName = classNames(
            'accordion-menu',
            {
                'accordion-menu--open': isOpen,
            },
        );

        return (
            <nav className={componentClassName}>
                <MenuItems
                    items={items}
                    currentSection={currentSection}
                    currentSubSection={currentSubSection}
                />
            </nav>
        );
    }
}
