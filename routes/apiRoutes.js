const savedNotes = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid");

module.exports = function (app) {

    // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function (req, res) {
        const currentNotes = JSON.parse(fs.readFileSync('./db/db.json')); 
        res.json(currentNotes)
    });


    // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    app.post("/api/notes", (req, res) => {

        //get the up to date notes from db.json objects array.
        const currentNotes = JSON.parse(fs.readFileSync('./db/db.json'))

        //receive a new note to save on the request body.
        let note = req.body;

        //generate an id per note.
        note.id = uuid.v4();

        //adding the new note to saved notes objects array
        currentNotes.push(note);

        //re writing the db.json file with the updated savedNotes objects array.
        fs.writeFileSync("./db/db.json", JSON.stringify(currentNotes))

        // display the updated notes.
        res.json(currentNotes);
    });

    app.delete("/api/notes/:id", (req, res) => {

        //receive and save a query parameter containing the id of a note to delete.
        const chosen = req.params.id;
        
        //read all the notes from the db.json file
        const currentNotes = JSON.parse(fs.readFileSync('./db/db.json'));

        //remove the note with the given id property
        const newNotes = JSON.stringify(currentNotes.filter((note) => note.id !== chosen));
        
        //re write db.json file with updated notes
        fs.writeFileSync("./db/db.json", newNotes)

        //return updated current notes.
        res.json(currentNotes)
    });

};