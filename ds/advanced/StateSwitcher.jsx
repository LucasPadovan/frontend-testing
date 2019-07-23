import React, { Component } from 'react';

import Button from 'ds/basic/Button';

import './StateSwitcher.scss';

export default class StateSwitcher extends Component {
    render() {
        const { state, possibleStates, onButtonClick } = this.props;
        const component = possibleStates.map(({ display, actionDisplay, value }) => {
            const isCurrentState = state === value;
            let displayValue = display;
            let activeProps = {};
            let inactiveProps = {};

            if (!isCurrentState) {
                displayValue = actionDisplay;
                activeProps = {
                    onClick: onButtonClick.bind(null, value),
                    size: 'small',
                };
            } else {
                inactiveProps = {
                    variant: 'primary',
                };
            }

            return (
                <div className="p-1" key={`button-wrapper-for-${value}`}>
                    <Button
                        key={value}
                        type="button"
                        disabled={isCurrentState}
                        text={displayValue}
                        {...activeProps}
                        {...inactiveProps}
                    />
                </div>
            );
        });

        return (
            <div className="state-switcher">
                {component}
            </div>
        );
    }
}
