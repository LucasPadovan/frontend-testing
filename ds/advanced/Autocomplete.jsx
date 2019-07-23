import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import './Autocomplete.scss';

const getSuggestions = (value, possibleValues, excludedIds) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let suggestions = [];

    if (inputLength !== 0) {
        suggestions = possibleValues.filter((possibleValue) => {
            const isValueMatching = possibleValue.name.toLowerCase().slice(0, inputLength) === inputValue;
            const isMongoId = typeof (possibleValue._id) === 'object';
            const possibleValueId = isMongoId ? possibleValue._id._str : possibleValue._id
            const isNewValue = !excludedIds.includes(possibleValueId);
            const shouldAddValue = isValueMatching && isNewValue;

            return (shouldAddValue);
        });
    }

    return suggestions;
};

const getSuggestionValue = (suggestion) => (suggestion.name);

const renderSuggestion = (suggestion) => (
    <div>
        {suggestion.name}
    </div>
);

export default class Autocomplete extends Component {
    state = {
        value: '',
        suggestions: [],
    };

    componentWillReceiveProps = ({ overrideValue }) => {
        this.setState({
            value: overrideValue,
        });
    }

    onChange = (event, { newValue }) => {
        this.props.onChangeField({
            inputValue: newValue,
        });

        this.setState({
            value: newValue,
        });
    };

    onKeyPress = (event) => {
        const { onKeyPressOnField } = this.props;

        if (event.which === 13) {
            event.preventDefault();

            if (onKeyPressOnField) {
                onKeyPressOnField();
            }
        }
    }

    onSuggestionsFetchRequested = ({ value }) => {
        const { possibleValues, excludedIds } = this.props;

        this.setState({
            suggestions: getSuggestions(value, possibleValues, excludedIds),
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    onSuggestionsSelected = (event, { suggestion }) => {
        this.props.onChangeField({
            ...suggestion,
            inputValue: event.target.textContent,
        });

        return (
            suggestion
        );
    }

    render() {
        const { suggestions, value } = this.state;
        const { placeholder, label, inputId } = this.props;

        const inputProps = {
            placeholder,
            value,
            onKeyPress: this.onKeyPress,
            onChange: this.onChange,
            className: 'form-control',
        };
        let labelComponent = null;

        if (label) {
            labelComponent = (<label htmlFor={inputId}>{label}</label>);
        }

        return (
            <div>
                {labelComponent}
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionsSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>

        );
    }
}
