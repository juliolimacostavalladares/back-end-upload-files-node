const routes = require("express").Router();
const multer = require("multer");

const configMulter = require("../config/multer");

const UploadedController = require("../controller/UploadedController");
const AuthController = require("../controller/AuthController");

const authMiddleware = require("../middleware/authMiddleware");

// Rotas para criação e listagem de uplods

routes.post(
  "/upload",
  multer(configMulter.s3).single("file"),
  UploadedController.createNewUpload
);
routes.get("/list-url", UploadedController.listUrls);
routes.get("/upload", UploadedController.findAllUploads);
routes.delete("/upload/:id", UploadedController.deleteUploads);

// Rotas de criação e listagem de usuários

routes.post("/register", AuthController.regiterUsers);
routes.post("/authenticate", AuthController.authenticationUsers);
routes.get("/users", AuthController.findAllUsers);
routes.get("/users/:id", authMiddleware, AuthController.findOneUsers);

// Rotas para autenticação dos usuários
routes.get("/validate", (req, res) => {
  res.send({ home: true });
});

module.exports = routes;
