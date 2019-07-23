import esLocale from 'moment/locale/es';
import moment from 'moment';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from './App';

import './main.scss';

Meteor.startup(() => {
    /* Setup locale from the very beginning */
    moment.locale('es', esLocale);

    render(<App />, document.getElementById('root'));
});
