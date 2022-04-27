const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const User = require("../models/user");
const authConfig = require("../config/auth.json")
const router = express.Router()

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports.registerUser = async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ "error": "Usuário já cadastrado" })
        }

        const user = await User.create(req.body)

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });


    } catch (err) {
        return res.status(400).send({ error: "Erro ao cadastrar usuario" })
    }
}

module.exports.authenticate = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(400).send({ error: "Usuário não encontrado" })
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: "Senha invalida" })
    }

    user.password = undefined;


    res.send({
        user,
        token: generateToken({ id: user.id })
    });

}

