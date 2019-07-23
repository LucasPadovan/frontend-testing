import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const auth = {
    authenticate({
        email,
        password,
        onLoginSucceeded,
    }) {
        Meteor.loginWithPassword(
            email,
            password,
            (error) => {
                if (error) {
                    /* eslint-disable no-console */
                    console.log(error);

                    return error;
                }

                if (onLoginSucceeded) {
                    onLoginSucceeded();
                }
            },
        );
    },

    signout(cb) {
        Meteor.logout(cb);
    },
};

export const recoverPassword = (email, callback) => {
    console.log(callback);
    const anotherFunction = (cosas) => {
        console.log(cosas);
    }

    Accounts.forgotPassword({ email, callback: anotherFunction });
    // callback();
};
