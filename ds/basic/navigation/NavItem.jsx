import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import './NavItem.scss';

export default class NavItem extends PureComponent {
    render() {
        const {
            title,
            to,
            isCurrentSection,
            onClick,
        } = this.props;
        const itemClassName = classNames(
            'nav-item',
            {
                'active': isCurrentSection,
            },
        );

        return (
            <li className={itemClassName}>
                <Link className="nav-link p-h-3" to={to} onClick={onClick}>{title}</Link>
            </li>
        );
    }
}
