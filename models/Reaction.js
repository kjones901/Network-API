const {Schema} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            //type: ObjectId,
            //default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            //character length 1 -280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            //default:
            //getter mothod to format.
        }
    }
)