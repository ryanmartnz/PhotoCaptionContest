const express = require("express");
const router = express.Router();

const captionController = require('../controllers').captions;
const { authorizeJwt } = require('../middleware');

router.param("id", captionController.findCaption);

/**
 * @swagger
 * /captions/{id}:
 *    get:
 *      summary: Get an individual caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      parameters:
 *        - name: id
 *          description: caption id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a caption
 *        "404":
 *          description: User not found
 *        "500":
 *          description: internal error
 */
router.get("/:id", captionController.listCaptionById);

/**
 * @swagger
 * /captions:
 *    post:
 *      summary: Creates a new caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      requestBody:
 *        description: Data for new caption
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                photo_id:
 *                  type: integer
 *                comment:
 *                  type: string
 *              example:
 *                photo_id: 1
 *                comment: "comment"
 *      responses:
 *        "201":
 *          description: returns created caption
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized
 *        "500":
 *          description: internal error
 */
router.post("/", authorizeJwt.verifyToken, captionController.addCaption);

/**
 * @swagger
 * /captions/{id}:
 *    put:
 *      summary: Updates a caption's comment
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      parameters:
 *        - name: id
 *          description: caption id to update
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Updated comment
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                comment:
 *                  type: string
 *              example: 
 *                comment: "This is an AMAZING photo"
 *      responses:
 *        "201":
 *          description: returns updated caption
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to update this caption
 *        "404":
 *          description: caption not found
 *        "500":
 *          description: internal error
 */
router.put("/:id", authorizeJwt.verifyToken, captionController.updateCaption);

/**
 * @swagger
 * /captions/{id}:
 *    delete:
 *      summary: Deletes a caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      parameters:
 *        - name: id
 *          description: caption id to delete
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: caption deleted
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to delete this caption
 *        "404":
 *          description: caption not found
 *        "500":
 *          description: internal error
 */
router.delete("/:id", authorizeJwt.verifyToken, captionController.deleteCaption);

module.exports = router;