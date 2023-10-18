import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note"
import { Container, Row, Col, Button} from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css"
import * as NotesApi  from "./network/notes_api"
import AddEditNoteDialog from './components/AddEditNoteDialog';
import {GoPlusCircle} from "react-icons/go"
import styleUtils from "./styles/utils.module.css"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit]=useState<NoteModel|null>(null);

  useEffect(() => {

    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes)
      } catch (error) {
        console.error(error);
        alert(error);
      }

    }
    loadNotes();
  }, [])  //empty array to execute once

  async function deleteNote(note:NoteModel) {
    try {
      await NotesApi.deleteNode(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));

    } catch (error) {
      console.error(error);
      alert(error);
    }
    
  }

  return (

    <Container>
      <Button 
      className={`mb-4 mt-4 btn-warning ${styleUtils.flexCenter}`}
      onClick={()=>setShowAddNoteDialog(true)}
      
      >
        <GoPlusCircle />
          Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id} >
            <Note 
            note={note} 
            className={styles.note}
            onDeleteNoteCLicked={deleteNote}
            onNoteClicked={(note)=>{
              setNoteToEdit(note);}}
            />
          </Col>
        ))}
      </Row>
      {
        showAddNoteDialog &&  //completely removes component so the dialog box is empty everytime
        <AddEditNoteDialog
        onDismiss={() => setShowAddNoteDialog(false)}
        onNoteSaved={(newNote)=>{
          setNotes([...notes, newNote]); //creates new array refreshes new note auto
          setShowAddNoteDialog(false); //close dialog
        }}
        />
      }
      {noteToEdit &&
      <AddEditNoteDialog
      noteToEdit={noteToEdit}
      onDismiss={()=> setNoteToEdit(null)}
      onNoteSaved={(updatedNote)=>{
        setNotes(notes.map(existingNote=> existingNote._id === updatedNote._id ? updatedNote : existingNote));
        setNoteToEdit(null);
      }}
      />
      }
    </Container>


  );
}

export default App;
