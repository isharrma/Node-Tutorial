const model = require("../models/friends.model");

function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Friend Name not mentioned.",
    });
  }
  const newFriend = {
    id: model.length,
    name: req.body.name,
  };
  model.push(newFriend);
  res.json(newFriend);
}

function getFriends(req, res) {
  res.json(model);
}

function getFriend(req, res) {
  const friendId = +req.params.friendId;
  const friend = model[friendId];
  if (friend) {
    res.json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist",
    });
    // We send 404 explicitly here as according to express the URL is correct and it will show an empty screen
  }
}

module.exports = {
  postFriend,
  getFriends,
  getFriend,
};
