
const userService = require('../services/userService');

// Route d'enregistrement
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.register({ email, password });
        res.status(201).send({ user });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

// Route de connexion
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.login(email, password);
        res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};
// Route de verification
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const result = await userService.verifyEmail(token);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};
// route by id 
const GetUserByIds = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.findById(id);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};
module.exports = {
    register,
    login,
    verifyEmail,
    GetUserByIds
};

