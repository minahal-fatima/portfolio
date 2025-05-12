const readline = require('readline');
const notes = require('./notes');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your note: ", (input) => {
  if (!input.trim()) {
    console.log("Note cannot be empty!");
  } else {
    notes.saveNote(input);
  }
  rl.close();
});
