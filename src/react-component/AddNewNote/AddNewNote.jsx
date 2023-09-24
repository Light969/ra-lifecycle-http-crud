import './AddNewNote.css';
import React from 'react';
import NewNote from '../NewNote/NewNote';

const MESSAGE = {
    message: ''
}

const server = 'http://localhost:7070/notes';

class AddNewNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notes: [], noteEntity: MESSAGE };
    }

    componentDidMount() {
        this.getNoteList();
    }

    getNoteList() {
        let noteList = () => {
            fetch(server)
                .then((responce) => responce.json())
                .then((notes) => this.setState({ notes }))
        }
        noteList();
    }

    changeSubmit(evt) {
        this.setState(() => ({
            noteEntity: {
                message: evt.target.value
            }
        }))
    }

    addNote(evt) {
        evt.preventDefault();
        const addToNoteList = () => {
            fetch(server, {
                method: 'POST',
                body: JSON.stringify(this.state.noteEntity),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => this.getNoteList())
        }
        addToNoteList();
    }

    removeMessage(id) {
        const removeNoteList = () => {
            fetch(`${server}/${id}`, {
                method: 'DELETE'
            })
                .then(() => this.getNoteList())
        }
        removeNoteList();
    }

    render() {
        return (
            <React.Fragment>
                <div className="notes">
                    <h1>Notes</h1>
                    <button className="update-button" onClick={() => this.getNoteList()}>&#128472;</button>
                    <form className="area-notes" onSubmit={(evt) => this.addNote(evt)}>
                        <textarea placeholder="New Note" type="text" className="note-text-area" onChange={(evt) => this.changeSubmit(evt)} />
                        <button className="notes-button"></button>
                    </form>
                </div>
                <div className="notes-list">
                    {this.state.notes.map(item => (
                            <NewNote key={item.id} id={item.id} message={item.message} removeMessage={(id) => this.removeMessage(id)} />
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default AddNewNote