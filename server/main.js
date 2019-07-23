import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
    if (!Meteor.users.find().count()) {
        Accounts.createUser({ username: 'admin', password: 'admin' });
    }
});
