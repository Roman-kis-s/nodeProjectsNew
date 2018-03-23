const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./note');

const noteTitle = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const noteBody = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};


const argv = yargs
    .command('add', 'Add new note', {
        title: noteTitle,
        body: noteBody
    })
    .command('list', 'Listing all notes')
    .command('read', 'Read a note', {
        title: noteTitle
    })
    .command('delete', 'Remove a note', {
        title: noteTitle
    })
    .help()
    .argv;
let command = argv._[0];
if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log("Note added.");
        notes.logNote(note);
    } else {
        console.log("Note not added");
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log("Note found!");
        notes.logNote(note);
    } else {
        console.log("Note not found");
    }
} else if (command === 'delete') {
    let isRemoved = notes.removeNote(argv.title);
    if (isRemoved) {
        console.log('Note was removed.');
    } else {
        console.log('Note wasn`t found');
    }
} else {
    console.log('Don`t recognise command');
}

