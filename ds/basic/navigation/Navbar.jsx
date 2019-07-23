import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { PureComponent } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import classNames from 'classnames';

import NavItem from './NavItem';
import DropdownNavItem from './DropdownNavItem';
import MenuToggle from './MenuToggle';

import { auth } from '../../../imports/ui/utils/authentication';

import './Navbar.scss';

const PublicMenu = () => (
    <ul className="nav-menu">
        <NavItem title="Login" to="/login" />
        <NavItem title="SignIn" to="/signin" />
    </ul>
);

const ManagerMenu = () => (
    <ul className="nav-menu">
        <NavItem title="Ds" to="/manager/ds" />
    </ul>
);

const AuthenticatedMenu = ({ user: { username }, onLogoutClick }) => (
    <ul className="nav-menu">
        <NavItem title={username} to="/" />
        <NavItem title="Juegos" to="/admin/games" />
        <NavItem title="Logout" to="/" onClick={onLogoutClick} />
    </ul>
);

class Navbar extends PureComponent {
    static defaultProps = {
        user: {
            username: '',
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };
    }

    _handleOnClick() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    _handleLogout = () => {
        const { history } = this.props;

        auth.signout(() => history.push('/'));
    }

    render() {
        const { user, isAuthenticated } = this.props;
        const { collapsed } = this.state;
        const menuClassName = classNames(
            'nav-menu-container nav-menu--collapsable',
            {
                'show': collapsed,
            },
        );

        let menuItems = (
            <PublicMenu />
        );

        if (isAuthenticated) {
            menuItems = (
                <AuthenticatedMenu user={user} onLogoutClick={this._handleLogout} />
            );
        }

        return (
            <nav className="nav-container">
                <div className="nav-wrapper p-h-3">
                    <Link className="nav-item--brand m-v-3" to="/">
                        <span className="nav-item--brand-part">
                            React
                        </span>
                        <span className="nav-item--brand-part">
                            base
                        </span>
                    </Link>

                    <div className={menuClassName}>
                        {menuItems}

                        <ManagerMenu />
                    </div>
                </div>
            </nav>
        );
    }
}


const withRouterComponent = withRouter(Navbar);

export default withTracker(() => {
    const userId = Meteor.userId();
    const user = Meteor.users.findOne(userId);

    return {
        user,
        isAuthenticated: !!userId,
    };
})(withRouterComponent);
