const fs = require('fs');

var originalNote = {
    title : "Some title",
    body : "Some body"
};

var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

var noteStringFromFile = fs.readFileSync('notes.json');

var note = JSON.parse(noteStringFromFile);

console.log(note.title);