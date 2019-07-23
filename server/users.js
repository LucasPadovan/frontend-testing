import { Meteor } from 'meteor/meteor';

Meteor.publish('users', () => {
    const projection = {fields: {username: 1}};

    return Meteor.users.find({}, projection);
});
