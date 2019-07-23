import React from 'react';
import classNames from 'classnames';
import { includes } from 'lodash';

import './Notification.scss';

const NOTIFICATION_TYPES = [
    'success',
    'error',
    'info',
    'alert',
];

const Notification = ({
    type,
    text,
    isTemporary,
}) => {
    const notificationClassNames = classNames(
        'floating-notification',
        {
            [`floating-notification--${type}`]: type && includes(NOTIFICATION_TYPES, type),
            'floating-notification--temporary': isTemporary,
        },
    );

    return (
        <div className={notificationClassNames}>
            {text}
        </div>
    );
};

export default Notification;
