const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { create } = require('./User');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        requried: 'Body is required',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Username required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
})

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Text is required',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: 'username is required',
        ref: 'User'
    },
    reactions: [reactionSchema]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;