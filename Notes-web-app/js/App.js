import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

 
export default class App {
    constructor(root) { ////constructor fn is fetched in main.js
        this.notes = [];
        this.activeNote = null; //its not active currently
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();//fn call
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();//fetch all notes from local storage

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);//it set the first node present inside is make active and display in grey color
        }
    }
    
    _setNotes(notes) { //get the notes that fetch
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0); //it shows if note 1 is here in display
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note); //this fn call all are stored in notesview.js
    }
    
    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);//it goes to localstorage and check the id is same with notes
                this._setActiveNote(selectedNote);//whatever is selected it is active throught this fn
            },
            onNoteAdd: () => { //if we click new note is created
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };

                NotesAPI.saveNote(newNote);//its save in local storage
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => { //it refer the preview
                NotesAPI.saveNote({ //save the details in localstorage whatever write
                    id: this.activeNote.id,
                    title,
                    body
                });

                this._refreshNotes();  //refresh  and display the updated notes
            },
            onNoteDelete: noteId => { //o to localstorage and match with id and delete it 
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}
