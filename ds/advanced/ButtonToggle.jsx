import React, { Component } from 'react';

import Button from '../basic/Button';

export default class ButtonToggle extends Component {
    render() {
        const {
            display,
            actionDisplay,
            value,
            state,
            onButtonClick,
        } = this.props;
        let displayValue = display;
        let extraProps = {
            onClick: onButtonClick.bind(null, value),
            size: 'small',
        };

        if (state === value) {
            extraProps = {
                onClick: onButtonClick.bind(null, ''),
                size: 'small',
                variant: 'primary',
            };
        } else {
            displayValue = actionDisplay;
        }

        return (
            <div className="p-2" key={`button-wrapper-for-${value}`}>
                <Button
                    key={value}
                    type="button"
                    text={displayValue}
                    {...extraProps}
                />
            </div>
        );
    }
}
