import React from 'react';

import './Pill.scss';

const Pill = ({ text }) => (
    <div className="pill">
        <div className="pill__text">
            {text}
        </div>
    </div>
);

export default Pill;
