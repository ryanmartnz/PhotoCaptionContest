const auth = require('./authController.js');
const users = require('./userController.js');
const photos = require('./photoController.js');
const captions = require('./captionController.js');

module.exports = {
  auth,
  users,
  photos,
  captions,
};
