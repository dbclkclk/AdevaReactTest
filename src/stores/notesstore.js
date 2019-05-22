import Dispatcher from "../dispatcher/dispatcher";
import ACTION from "../constants/actions";
import { EventEmitter } from "events";

let notesStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on("change", callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener("change", callback);
  },
  emitChange: function() {
    this.emit("change");
  },
  getState: function() {
    return JSON.parse(localStorage.getItem('notes'));
  }
});
function getValue() {
    let values = JSON.parse(localStorage.getItem('notes'));
    values = (values == null || values == undefined) ? [] : values;
    return values;
}

Dispatcher.register(function(param) {
  switch (param.action) {
    case ACTION.ADD:
      var values = getValue();
      values.push(param.value);
      localStorage.setItem('notes', JSON.stringify(values));
      notesStore.emitChange();
      break;
    case ACTION.DELETE:
      var values = getValue();
      values.splice(param.value, 1);
      localStorage.setItem('notes', JSON.stringify(values));
      notesStore.emitChange();
      break;
    case ACTION.UPDATE:
      var values = getValue();
      values[param.key] = param.value;
      localStorage.setItem('notes', JSON.stringify(values));
      notesStore.emitChange();
      break;
    default:
      break;
  }
});

export default notesStore;
