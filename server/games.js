import { Meteor } from 'meteor/meteor';
import Games from '../imports/api/games';

Meteor.publish('game', (oid) => {
    return Games.find(oid);
});

Meteor.publish('games', () => {
    return Games.find();
});
