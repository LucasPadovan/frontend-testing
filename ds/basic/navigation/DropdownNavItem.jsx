import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class DropdownNavItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
        };
    }

    _handleOnClick(event) {
        event.preventDefault();

        this.setState({
            active: !this.state.active,
        });
    }

    _handleOnBlur(event) {
        const { currentTarget } = event;
        const blurList = () => {
            if (!currentTarget.contains(document.activeElement)) {
                this.setState({
                    active: false,
                });
            }
        };

        setTimeout(blurList.bind(this), 0);
    }

    render() {
        const { title, children, isCurrentSection } = this.props;
        const { active } = this.state;
        const itemClassName = classNames(
            'nav-item dropdown px-4',
            {
                'active': isCurrentSection,
            },
        );
        const dropdownClassName = classNames(
            'dropdown-menu',
            {
                'show': active,
            },
        );

        return (
            <li
                className={itemClassName}
                role="button"
                aria-haspopup="true"
                aria-expanded={active}
                onClick={this._handleOnClick.bind(this)}
                onBlur={this._handleOnBlur.bind(this)}
            >
                <a className="nav-link dropdown-toggle" href="?#">
                    {title}
                </a>
                <div className={dropdownClassName} aria-labelledby="navbarDropdown">
                    {children}
                </div>
            </li>
        );
    }
}
