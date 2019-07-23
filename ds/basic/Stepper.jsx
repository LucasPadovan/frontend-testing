import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Stepper.scss';

export default class Stepper extends PureComponent {
    static propTypes = {
        defaultValue: PropTypes.number,
        shouldHideButtons: PropTypes.bool,
        minValue: PropTypes.number,
        maxValue: PropTypes.number,
        step: PropTypes.number,
        /*
         * Linked value is neccesary when using 2 or more steppers at the same time
         * will allow to disable the increase/decrease buttons when a summatory of 2 or more steppers surpasses the max value
         */
        linkedValue: PropTypes.number,
        currentSumatory: PropTypes.number,
        onClickDecrease: PropTypes.func,
        onClickIncrease: PropTypes.func,
    }

    static defaultProps = {
        defaultValue: 0,
        shouldHideButtons: false,
        minValue: 0,
        maxValue: 10,
        step: 1,
        linkedValue: 0,
        currentSumatory: 0,
        onClickDecrease() {},
        onClickIncrease() {},
    };

    constructor(props) {
        super(props);

        const { defaultValue, minValue, maxValue } = props;

        this.state = {
            value: 0,
            isDecreaseButtonDisabled: defaultValue <= minValue,
            isIncreaseButtonDisabled: defaultValue >= maxValue,
        };
    }

    componentWillReceiveProps(nextProps) {
        const {
            defaultValue,
            minValue,
            maxValue,
            linkedValue,
        } = nextProps;

        if (defaultValue > -1) {
            this.setState({
                ...this.state,
                value: defaultValue,
                isDecreaseButtonDisabled: defaultValue <= minValue,
                isIncreaseButtonDisabled: defaultValue + linkedValue >= maxValue,
            });
        }
    }

    _handleClickDecrease = () => {
        const {
            onClickDecrease,
            step,
            maxValue,
            minValue,
        } = this.props;
        const { value } = this.state;

        let isDecreaseButtonDisabled = false;
        const newValue = value - step;
        const isIncreaseButtonDisabled = newValue > maxValue;

        if (newValue <= minValue) {
            isDecreaseButtonDisabled = true;
        }

        this.setState({
            value: newValue,
            isDecreaseButtonDisabled,
            isIncreaseButtonDisabled,
        });

        if (onClickDecrease) {
            onClickDecrease(newValue);
        }
    }

    _handleClickIncrease = () => {
        const {
            onClickIncrease,
            step,
            maxValue,
            minValue,
            linkedValue,
        } = this.props;
        const { value } = this.state;

        let isIncreaseButtonDisabled = false;
        let newValue = value + step;
        const isDecreaseButtonDisabled = newValue < minValue;

        if (linkedValue) {
            newValue += linkedValue;
        }

        if (newValue >= maxValue) {
            isIncreaseButtonDisabled = true;
        }

        this.setState({
            value: newValue,
            isDecreaseButtonDisabled,
            isIncreaseButtonDisabled,
        });

        if (onClickIncrease) {
            onClickIncrease(newValue);
        }
    }

    render() {
        const { shouldHideButtons } = this.props;
        const {
            value,
            isDecreaseButtonDisabled,
            isIncreaseButtonDisabled,
        } = this.state;
        let stepperButtonDecrease = null;
        let stepperButtonIncrease = null;

        if (!shouldHideButtons) {
            stepperButtonDecrease = (
                <button
                    className="stepper__button stepper__button--decrease"
                    disabled={isDecreaseButtonDisabled}
                    onClick={this._handleClickDecrease}
                />
            );
            stepperButtonIncrease = (
                <button
                    className="stepper__button stepper__button--increase"
                    disabled={isIncreaseButtonDisabled}
                    onClick={this._handleClickIncrease}
                />
            );
        }

        return (
            <div className="stepper">
                {stepperButtonDecrease}

                <div className="stepper__value">
                    {value}
                </div>

                {stepperButtonIncrease}
            </div>
        );
    }
}
