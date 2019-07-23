import React from 'react';
import classNames from 'classnames';

import './Card.scss';

const GRADIENT_VARIANT = 'gradient';

const Card = ({ children, type }) => {
    const cardClassNames = classNames(
        'card',
        'p-6',
        {
            'card--gradient': type === GRADIENT_VARIANT,
        },
    );

    return (
        <div className={cardClassNames}>
            {children}
        </div>
    );
};

export default Card;
