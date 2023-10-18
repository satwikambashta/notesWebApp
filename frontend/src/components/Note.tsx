import styles from "../styles/Note.module.css"
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import {MdDelete} from "react-icons/md"

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel)=>void,
    onDeleteNoteCLicked:(note: NoteModel)=>void,
    className?: string,
}


const Note = ({ note, onNoteClicked, onDeleteNoteCLicked, className }: NoteProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    let createdUpdatedText: string;
    if(updatedAt>createdAt)
    {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    }
    else{
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card className={`${styles.noteCard}, ${className}`}
        onClick={()=>onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>

            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
                <MdDelete 
                    onClick={(e)=>{
                        onDeleteNoteCLicked(note);
                        e.stopPropagation();
                    }}
                />
            </Card.Footer>
        </Card>
    )
}

export default Note;