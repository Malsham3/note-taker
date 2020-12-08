const savedNotes = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid");

module.exports = function (app) {
    
    // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function (req, res) {
        res.json(savedNotes);
    });
    
    
    // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    app.post("/api/notes", (req, res) => {

        //receive a new note to save on the request body.
        const note = req.body
        
        //generate an id per note.
        note.id = uuid.v4();

        //adding the new note to saved notes objects array
        savedNotes.push(note);

        //re writing the db.json file with the updated savedNotes objects array.
        fs.writeFile("./db/db.json", JSON.stringify(savedNotes))

        //display the note that user created
        res.json(note);
    });

    app.delete("/api/:id", (req, res) => {

        //receive and save a query parameter containing the id of a note to delete.
        const chosen = req.params.id;

        //read all the notes from the db.json file
        const oldNotes = JSON.parse(fs.readFileSync('./db/db.json'));

        //remove the note with the given id property
        const newNotes = JSON.stringify(oldNotes.filter((savedNote) => savedNote.id !== chosen));

        //re-write the notes to the db.json file
        fs.writeFile("./db/db.json", JSON.stringify(newNotes));
    });
};