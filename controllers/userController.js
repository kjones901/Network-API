const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: "No user exists with that ID" });
      }

      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "That user doesn't exist" });
      }
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "That user doesn't exist" });
      }
      res.json({ message: "User successfully updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No user with this id" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No user with this id" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
