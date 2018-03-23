let fs = require('fs');
let fetchNotes = () => {
    try {
        let stringNotes = fs.readFileSync('notes-data.json');
        return JSON.parse(stringNotes);
    } catch (e) {
        return [];
    }
};
let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };
    let duplicateNotes = notes.filter((note) => note.title === title);
    if (!duplicateNotes.length) {
        notes.push(note);
        saveNotes(notes)
    } else {
        console.log("duplicate title");
        return;
    }
    return note;
};
let getAll = () => {
    return fetchNotes();
};
let getNote = (title) => {
    let notes = fetchNotes();
    let noteForReading = notes.filter((note) => note.title === title);
    return noteForReading[0];
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

let logNote = (note) => {
    console.log(`---Note---\nTitle: ${note.title}\nBody: ${note.body}`);
};
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};