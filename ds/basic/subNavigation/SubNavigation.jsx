import React, { PureComponent } from 'react';
import classNames from 'classnames';

// TODO: use router Link, styling

const SubNavItems = ({ items }) => (
    items.map(({
        title,
        onClick,
        link = '#',
        selected,
    }, index) => {
        const navItemClassNames = classNames(
            'nav-item px-2',
            {
                'active': selected,
            },
        );

        return (
            <li className={navItemClassNames} key={`subnav-${index}`}>
                <a className="nav-link" onClick={onClick} href={link}>
                    {title}
                </a>
            </li>
        );
    })
);

export default class SubNavigation extends PureComponent {
    render() {
        const { items } = this.props;

        return (
            <nav className="navbar navbar-expand navbar-light">
                <ul className="nav-menu">
                    <SubNavItems items={items} />
                </ul>
            </nav>
        );
    }
}
