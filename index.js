const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const fs = require('fs');
const path = require('path');

dotenv.config();

const serviceAccountPath = path.resolve(__dirname, process.env.SERVICE_ACCOUNT);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

const app = express();

const PORT = process.env.PORT || 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
});

const db = admin.firestore();

app.use(cors);
app.use(bodyParser.json());

// Your existing endpoint code here...

app.post("/directo", async (req, res) => {
    const { token, title, body } = req.body;
  
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
    };
  
    try {
      const response = await admin.messaging().send(message);
      res.status(200).send(`Mensaje enviado correctamente: ${response}`);
    } catch (error) {
      res.status(500).send(`Error al enviar el mensaje: ${error}`);
    }
  });
  
  // Endpoint para enviar notificación a todos los empleados de un rol
  app.post("/general", async (req, res) => {
    const { title, body, role } = req.body;
  
    try {
      const employeeTokens = [];
      const querySnapshot = await db
        .collection("usuario")
        .where("rol", "==", role)
        .get();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.token) {
          employeeTokens.push(data.token);
        }
      });
  
      if (employeeTokens.length === 0) {
        return res
          .status(404)
          .send("No hay usuarios a los que enviar un mensaje");
      }
  
      const message = {
        notification: {
          title: title,
          body: body,
        },
        tokens: employeeTokens,
      };
  
      const response = await admin.messaging().sendEachForMulticast(message);
      res.status(200).send(`Mensajes enviados: ${response.successCount}`);
    } catch (error) {
      res.status(500).send(`Error al enviar mensaje: ${error}`);
    }
  });

exports.app = functions.https.onRequest(app);