import Dispatcher from "../dispatcher/dispatcher";
import ACTION from "../constants/actions";
import { EventEmitter } from "events";

var _noteStore = null;
let noteStore = Object.assign({}, EventEmitter.prototype, {
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
    return _noteStore;
  }
});
Dispatcher.register(function(param) {
  switch (param.action) {
    case ACTION.EDIT:
      _noteStore = {value: param.value, key: param.key};
      noteStore.emitChange();
      break;
    default:
      break;
  }
});

export default noteStore;
