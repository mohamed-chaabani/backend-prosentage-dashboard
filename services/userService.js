
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/mailer');
const crypto = require('crypto');
const userService = {
    // Enregistrement d'un utilisateur
    register: async (userData) => {
        const { email, password } = userData;

        // Vérification si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email déjà utilisé');
        }

        // Création du nouvel utilisateur
        const user = new User({ email, password, verification_token: crypto.randomBytes(32).toString('hex') ,is_verified: false });
        await user.save();

        const verifyLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/api/verify-email?token=${user.verification_token}`;

        await sendEmail(email, 'Vérifiez votre compte', `
            <h3>Bienvenue !</h3>
            <p>Merci de vous être inscrit. Veuillez vérifier votre adresse en cliquant ci-dessous :</p>
            <a href="${verifyLink}">Vérifier mon email</a>
        `);

        return { message: 'Utilisateur créé. Vérifiez votre email.' };
    },

    verifyEmail: async (token) => {
        const user = await User.findOne({ verification_token: token });
        if (!user) throw new Error('Token invalide');
        // Vérifier l'email
        user.is_verified = true;
        user.verification_token = null; // Supprimer le token pour éviter réutilisation
        await user.save();
        return { message: 'Email vérifié avec succès.' };
    },

    // Connexion d'un utilisateur
    login: async (email, password) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        if (!user.is_verified) throw new Error('Email non vérifié');
        const isValidPassword = await user.isPasswordValid(password);
        if (!isValidPassword) {
            throw new Error('Mot de passe incorrect');
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { token };
    },

    // Trouver un utilisateur par son email
    findByEmail: async (email) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        return user;
    },

    // Trouver un utilisateur par son ID
    findById: async (id) => {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        return user;
    }
};

module.exports = userService;

