import React from 'react';

import './GradientDivisor.scss';

const GradientDivisor = ({ marginVertical = 0, marginHorizontal = 0 }) => (
    <dl className={`gradient-divisor m-v-${marginVertical} m-h-${marginHorizontal}`} />
);

export default GradientDivisor;
