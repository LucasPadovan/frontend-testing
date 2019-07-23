import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './Button.scss';

const ButtonButton = ({ children, ...componentAttrs }) => (
    <button {...componentAttrs} type="button">{children}</button>
);

const ButtonSubmit = ({ children, ...componentAttrs }) => (
    <button {...componentAttrs} type="submit">{children}</button>
);

const ButtonLink = ({ children, ...componentAttrs }) => (
    <Link {...componentAttrs}>{children}</Link>
);

const BUTTON_TYPES = {
    button: ButtonButton,
    link: ButtonLink,
    submit: ButtonSubmit,
};

/*
 * Button configuration:
 * type: 'button', 'link', 'submit'
 * props for button and submit: 'onClick'
 * props for link: 'to'
 * optional prop: icon
 */
export default class Button extends PureComponent {
    render() {
        const {
            text,
            label,
            icon,
            onClick,
            link,
            variant,
            size,
            active,
            type,
            disabled,
            ...passingProps
        } = this.props;

        const buttonClassNames = classNames(
            'styled-button',
            {
                [`styled-button--${variant}`]: variant,
                [`styled-button--${size}`]: size,
            },
        );
        const componentProps = {
            'className': buttonClassNames,
            'aria-label': label,
            active,
            disabled,
        };
        const ButtonSubComponent = BUTTON_TYPES[type];
        let extraProps = {};

        if (onClick) {
            extraProps = {
                onClick,
            };
        } else if (link) {
            extraProps = {
                to: link,
            };
        }

        return (
            <ButtonSubComponent
                {...componentProps}
                {...extraProps}
                {...passingProps}
            >
                {icon}
                <span className="styled-button__text">{text}</span>
            </ButtonSubComponent>
        );
    }
}
