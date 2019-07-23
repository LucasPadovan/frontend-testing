import React, { Component } from 'react';

import Notification from '../basic/Notification';


export default class NotificationTemporary extends Component {
    constructor(props) {
        super(props);

        const { type, text, callback = () => {} } = props;

        this.state = {
            notificationComponent: (<Notification type={type} text={text} isTemporary={true} />),
        };

        setTimeout(() => {
            this.setState(
                {
                    notificationComponent: null,
                },
                callback(),
            );
        }, 5100);
    }

    componentWillReceiveProps = (nextProps) => {
        const { type, text, callback = () => {} } = nextProps;

        this.setState({
            notificationComponent: (<Notification type={type} text={text} isTemporary={true} />),
        });

        setTimeout(() => {
            this.setState(
                {
                    notificationComponent: null,
                },
                callback(),
            );
        }, 5100);
    }

    render() {
        const { notificationComponent } = this.state;

        return notificationComponent;
    }
}
