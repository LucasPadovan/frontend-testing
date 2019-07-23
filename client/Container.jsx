import React from 'react';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

/* Public components */
import Homepage from '../imports/ui/Public/Homepage/index';

import './Container.scss';

// Guides say to use location.key here but that triggers a re-render of the same component. Using location.pathname prevents this completely.
const Container = ({ location }) => (
    <TransitionGroup className="body-content">
        <CSSTransition
            key={location.pathname}
            timeout={{ enter: 250, exit: 250 }}
        >
            <Switch location={location}>
                <Route exact path="/" component={Homepage} />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
);

export default withRouter(Container);
