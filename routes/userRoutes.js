const express = require("express");
const router = express.Router();

const userController = require('../controllers').users;
const { verifySignUp, authorizeJwt } = require( "../middleware" );
const authController = require( "../controllers" ).auth;

router.param("id", userController.findUser);

/**
 * @swagger
 * /users:
 *    get:
 *      summary: Get all users
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      responses:
 *        "200":
 *          description: returns a list of all users
 *          schema:
 *            type: array
 *        "500":
 *          description: internal error 
 */
router.get("/", userController.listUsers);

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      summary: Get an individual user
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      parameters:
 *        - name: id
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a user
 *        "404":
 *          description: User not found
 *        "500":
 *          description: internal error
 */
router.get("/:id", userController.listUserById);

/**
 * @swagger
 * /users:
 *    post:
 *      summary: Creates a new user
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      requestBody:
 *        description: Data for new user
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *              example:
 *                name: "John Doe"
 *                email: "JohnDoe@email.com"
 *                password: "password"
 *      responses:
 *        "201":
 *          description: returns created user
 *        "400":
 *          description: email is already in use
 *        "500":
 *          description: internal error
 */
router.post("/", verifySignUp.checkForDuplicateEmail, userController.signUp);

/**
 * @swagger
 * /users/{id}:
 *    put:
 *      summary: Updates a user's name or password
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      parameters:
 *        - name: id
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Updated user data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                password:
 *                  type: string
 *              example:
 *                name: "John Doe"
 *                password: "password"
 *      responses:
 *        "201":
 *          description: returns updated user
 *        "401":
 *          description: not authenticated
 *        "403":
 *          description: not authorized
 *        "404":
 *          description: user not found
 *        "500":
 *          description: internal error
 */
router.put("/:id", authorizeJwt.verifyToken, userController.updateUser);

/**
* @swagger
* /users/{id}:
*    delete:
*      summary: Deletes a user
*      tags:
*        - Users
*      parameters:
*        - name: id
*          description: user id
*          in: path
*          type: integer
*          required: true
*          example: 1
*      responses:
*        "204":
*          description: successfully deleted user
*        "401":
*          description: not authenticated
*        "403":
*          description: not authorized
*        "404":
*          description: user not found
*        "500":
*          description: internal error
*/
router.delete("/:id", authorizeJwt.verifyToken, userController.deleteUser);

/**
 * @swagger
 * /users/login:
 *    post:
 *      summary: Login to get user's access token
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      requestBody:
 *        description: Data to login as existing user
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *              example:
 *                email: "JohnDoe@email.com"
 *                password: "password"
 *      responses:
 *        "200":
 *          description: logs in user and returns access token
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              email:
 *                type: string
 *              name:
 *                type: string
 *              token:
 *                type: string
 *                description: auth token required for performing authenticated actions
 *        "400":
 *          description: incorrect username or password
 *        "500":
 *          description: internal error
 */
router.post("/login", authController.signIn);

/**
 * @swagger
 * /users/logout:
 *    post:
 *      summary: Login to get user's access token
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      responses:
 *        "200":
 *          description: successfully logged out
 *        "401":
 *          description: not authenticated
 *        "403":
 *          description: not authorized
 *        "500":
 *          description: internal error
 */
router.post("/logout", authorizeJwt.verifyToken, authController.signOut);

module.exports = router;