const express = require("express");
const router = express.Router();

const photoController = require('../controllers').photos;

router.param("id", photoController.findPhoto);

/**
 * @swagger
 * /photos:
 *    get:
 *      summary: Get all photos
 *      produces:
 *        - application/json
 *      tags:
 *        - Photos
 *      responses:
 *        "200":
 *          description: returns a list of all photos
 *        "500":
 *          description: internal error
 */
router.get("/", photoController.listPhotos);

/**
 * @swagger
 * /photos/{id}:
 *    get:
 *      summary: Get an individual photo with captions
 *      produces:
 *        - application/json
 *      tags:
 *        - Photos
 *      parameters:
 *        - name: id
 *          description: photo id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a photo with its captions
 *        "404":
 *          description: Photo not found
 *        "500":
 *          description: internal error
 */
router.get("/:id", photoController.listPhotoById);

module.exports = router;