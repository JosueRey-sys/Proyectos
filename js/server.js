const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/enviar-correo', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configura el transporte de nodemailer con tus credenciales de correo
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'reydike@gmail.com',
      pass: 'Josuesin123',
    },
  });

  // Configura el contenido del correo
  const mailOptions = {
    from: 'reydike@gmail.com',
    to: 'correo-destino@example.com',
    subject: 'Nuevo mensaje desde el formulario',
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`,
  };

  // Envía el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error al enviar el correo.');
    }
    console.log('Correo enviado:', info.response);
    res.status(200).send('Correo enviado correctamente.');
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});