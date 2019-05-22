import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import NoteAction from "../actions/note";
import NoteStore from "../stores/notestore";

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        form: {
            note: "",
            id: null
        }, 
        saved: false
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleState = this.handleState.bind(this);
    this.loadNote = this.loadNote.bind(this);
  }

  componentWillMount() {
      NoteStore.addChangeListener(this.loadNote);
  }
  loadNote() {
      let note = NoteStore.getState();
      this.setState({form: {note:note.value, id: note.key}});
  }
  submitForm(e) {
      e.preventDefault();
      if (this.state.form.id==null) {
        NoteAction.Add(this.state.form.note);
      }
      else 
      {
        NoteAction.Update(this.state.form.id, this.state.form.note);
      }
      let form = {...this.state.form};
      form.note = "";
      form.id = null;
      this.setState({form:form, saved: true});
  }
  handleState(e) {
    let form = {...this.state.form};
    form[e.target.name] = e.target.value;
    this.setState({form: form, saved: false});
  }
  render() {
      let message = this.state.saved === true ? (<Alert color="success">
                Note Saved!
            </Alert>) : "";
      return (
        <div className="Container-fluid">
            <h3>Add/Edit Notes</h3>
            {message}
            <Form onSubmit={this.submitForm}>
                <FormGroup>
                    <Input type="textarea" name="note" id="note" onChange={this.handleState} placeholder="Enter your note here" value={this.state.form.note} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
      );
  }
}
