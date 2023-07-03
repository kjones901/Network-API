const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateformat");

const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toLocaleDateString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
