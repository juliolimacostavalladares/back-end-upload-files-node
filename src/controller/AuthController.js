const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async regiterUsers(req, res) {
    const { email } = req.body;

    try {
      if (await Users.findOne({ where: { email: email } })) {
        res.status(400).send({ error: "Usuário já existente" });
      }

      const user = await Users.create(req.body);

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, process.env.TOKEN, {
        expiresIn: 604800,
      });

      res.json({ user, token });
    } catch (err) {
      return res.status(400).send({ err: "Flaha no registro" });
    }
  },

  async authenticationUsers(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email: email },
      attributes: ["password"],
    });
    if (!user) {
      return res.status(400).send({ err: "Usuario não encontrado" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ err: "Senha Errada" });
    }
    const userData = await Users.findAll({
      where: { email: email },
      attributes: {
        exclude: ["password"],
      },
    });
    const token = jwt.sign({ id: userData.id }, process.env.TOKEN, {
      expiresIn: 604800,
    });
    res.send({ userData, token });
  },

  async findAllUsers(req, res) {
    const user = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.send(user);
  },

  async findOneUsers(req, res) {
    const user = await Users.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        id: req.params.id,
      },
      force: true,
    });
    res.send(user);
  },
};
