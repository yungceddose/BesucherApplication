// client.js

import { getElementArray } from './jsonStorage.js';

const elementArray=getElementArray();

// Sende die Daten an den Node.js-Server
fetch('http://localhost:3000/saveData', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(elementArray)  // Array in JSON umwandeln und im Body senden
})
  .then(response => response.json())
  .then(data => {
    console.log('Erfolg:', data);
  })
  .catch((error) => {
    console.error('Fehler:', error);
  });