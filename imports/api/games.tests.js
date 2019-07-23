import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { name, lorem } from 'faker';

import Games from './games.js';

if (Meteor.isServer) {
    describe('Games', () => {
        describe('methods', () => {
            let gameId;

            beforeEach(() => {
                Games.remove({});

                gameId = Games.insert({
                    name: name.title(),
                    description: lorem.sentences(),
                });
            });

            it('can insert a game', () => {
                Meteor.call('games.insert', {
                    name: name.title(),
                    description: lorem.sentences(),
                });

                assert.equal(Games.find().count(), 2);
            });

            it('can delete a game', () => {
                Meteor.call('games.remove', gameId);

                assert.equal(Games.find().count(), 0);
            });

            it('can update a game', () => {
                const game = Games.findOne(gameId);

                Meteor.call('games.update', {
                    _id: gameId,
                    description: lorem.sentences(),
                });

                const updatedGame = Games.findOne(gameId);

                assert.equal(game.name, updatedGame.name);
                assert.notEqual(game.description, updatedGame.description);
            });
        });
    });
}
