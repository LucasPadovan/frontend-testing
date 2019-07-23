import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Games = new Mongo.Collection('games', { idGeneration: 'MONGO' });

Meteor.methods({
    'games.insert'({
        description,
        name,
    }) {
        Games.insert({
            name,
            description,
            createdAt: new Date(),
        });
    },

    'games.update'({
        _id,
        description,
        logo,
        name,
    }) {
        Games.update(_id, {
            $set: {
                description,
                logo,
                name,
                updatedAt: new Date(),
            },
        });
    },

    'games.remove'(_id) {
        Games.remove(_id);
    },
});

Games.allow({
    insert() {
        // The user must be logged in and the document must be owned by the user.
        return true;
    },

    update() {
        // Can only change your own documents.
        return true;
    },

    remove() {
        // Can only remove your own documents.
        return true;
    },

    // fetch: ['owner']
});

export default Games;
