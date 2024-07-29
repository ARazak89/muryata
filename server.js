// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(express.static('public'));

// app.post('/send-email', (req, res) => {
//     const formData = req.body;
//     const userEmail = formData.email;

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'hassane.abdelrazak@gmail.com',
//             pass: 'gdko rvbt jkop jgtq'
//         }
//     });

//     const mailOptions = {
//         from: 'hassane.abdelrazak@gmail.com', 
//         to: 'fadilatouhamamarou@gmail.com',
//         replyTo: userEmail,
//         subject: 'Réponses du formulaire de réflexion personnelle',
//         text: `
//         Adresse e-mail: ${userEmail}
//         Nom: ${formData.nom}
//         Prénom: ${formData.prenom}
//         Rêves: ${formData.reves}
//         Ambitions: ${formData.ambitions}
//         Partenaire de vie idéale: ${formData.partenaire}
//         Ce qu'il aurait aimé savoir plus tôt: ${formData['plus-tot']}
//         Ce qu'il devrait laisser derrière lui: ${formData.laisser}
//         Qui il aimerait être dans 5 ans: ${formData.avenir}
//         Succès: ${formData.succes}
//         Personne admirée: ${formData.admiration}
//         Ce qui donne la chair de poule: ${formData.peur}
//         Dernières 23h: ${formData['24h']}
//         Si à nouveau 13 ans: ${formData['13ans']}
//         Monde idéal: ${formData.ideal}
//         `
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).json({ success: false, message: error.message });
//         }
//         res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
//     });
// });

// app.listen(port, () => {
//     console.log(`Serveur démarré sur http://localhost:${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/send-email', (req, res) => {
    const formData = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'fadilatouhamamarou@gmail.com',
        subject: 'Formulaire de Réflexion Personnelle',
        text: JSON.stringify(formData, null, 2),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'form.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
