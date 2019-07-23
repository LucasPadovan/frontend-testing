import React, { PureComponent } from 'react';

export default class NavItem extends PureComponent {
    render() {
        const { active, onClick } = this.props;

        return (
            <div className="menu-toggle-wrapper">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    aria-controls="navbarSupportedContent"
                    aria-label="Toggle navigation"
                    aria-expanded={active}
                    onClick={onClick}
                >
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
        );
    }
}
