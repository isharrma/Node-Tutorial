function getMessages(req, res) {
  res.send("<ul><li>Hello,there</li></ul>");
}

function postMessages(req, res) {
  res.send("Updating Messages..");
}

module.exports = {
  getMessages,
  postMessages,
};
