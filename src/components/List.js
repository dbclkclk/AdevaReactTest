import React from "react";
import NotesStore from "../stores/notesstore";
import NoteAction from "../actions/note";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        note: null,
        search: null
    };
    this.renderNotes = this.renderNotes.bind(this);
    this.seeNote = this.seeNote.bind(this);
    this.close = this.close.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleState = this.handleState.bind(this);
    this.search = this.search.bind(this);
    this.editNote = this.editNote.bind(this);
  }
  componentWillMount() {
      NotesStore.addChangeListener(this.renderNotes);
      this.renderNotes();
  }
  editNote(key, note) {
      NoteAction.Edit(key, note);
  }
  renderNotes () {
      let values = NotesStore.getState();
      values = (values != null && values != undefined) ? values : [];
      this.setState({notes: values});
  }
  seeNote(note) {
     this.setState({note: note});
  }
  deleteNote(key) {
      NoteAction.Delete(key);
  }
  close () {
      this.setState({note: null});
  }
  handleState(e) {
    let search = e.target.value;
    this.setState({search: search});
  }
  search (note) {
       let result = true;
       let that = this;
       if (this.state.search != null && this.state.search != "")
            result = note.indexOf(that.state.search) > -1;
       return result;
  }
  render() {
    return (
        <div className="Container-fluid">
            <h3>Notes</h3>
            <Input type="text" name="search" id="search" onChange={this.handleState} placeholder="Enter your search term" />
            <ul className="list-group">
                    {this.state.notes.map((note, key) => 
                             (this.search(note) ? (<li className="list-group-item" key={key}><span>{note.substring(0, 10)+"..."}</span><span className="float-right"><a href="#" onClick={() => this.editNote(key, note)}><FontAwesomeIcon icon="edit" /></a>&nbsp; &nbsp;<a href="#" onClick={() => this.deleteNote(key)}><FontAwesomeIcon icon="trash" /></a>&nbsp; &nbsp;<a href="#" onClick={() => this.seeNote(note)}><FontAwesomeIcon icon="binoculars" /></a></span></li>) : "")

                    )}
            </ul>
            <Modal isOpen={this.state.note !== null}>
                <ModalHeader>
                    Note Display
                </ModalHeader>
                <ModalBody>
                    <p>{this.state.note}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.close}>close</Button>
                </ModalFooter>
            </Modal>
        </div>
      );
  }
}