const Uploads = require("../models/Uploads");

module.exports = {
  async listUrls(req, res) {
    const upload = await Uploads.findAll({
      attributes: ["id", "createdAt", "url"],
    });
    res.send(upload);
  },

  async findAllUploads(req, res) {
    const upload = await Uploads.findAll();
    res.send(upload);
  },

  async deleteUploads(req, res) {
    await Uploads.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    });
    res.send({ Deleted: true });
  },

  async createNewUpload(req, res) {
    const upload = await Uploads.create({
      name: req.file.originalname,
      size: req.file.size,
      key: req.file.key,
      url: req.file.location,
    });
    res.send(upload);
  },
};
