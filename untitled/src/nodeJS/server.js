// server.js
import express from 'express';
import * as path from 'node:path';  // Ersetze require mit import
import { fileURLToPath } from 'url';  // Hilft beim Arbeiten mit Dateipfaden in ES-Modulen
const app = express();
const port = 8383;

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

// Verzeichnis für statische Dateien bereit stellen
app.use(express.static(path.join(__dirname,'public')));

// Fallback Route für Index-Seite
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'));
})

/*
app.get('/', function (req, res) {
  res.status(200).send("<h1>Hello World!</h1>");
})
*/
app.listen(port,()=> console.log("Seerver has started on port: "+port));

