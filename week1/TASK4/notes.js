const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'notes.txt');

function saveNote(note) {
    fs.appendFileSync('notes.txt', note + '\n');
    console.log("Note saved successfully!");
  }  

module.exports = { saveNote };
