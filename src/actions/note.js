import Dispatcher from "../dispatcher/dispatcher";
import ACTION from "../constants/actions";

export default {
  Add: function(param) {
    Dispatcher.dispatch({
      action: ACTION.ADD,
      value: param
    });
  },
  Delete: function(key) {
    Dispatcher.dispatch({
      action: ACTION.DELETE,
      value: key
    });
  },
  Edit: function(key, value) {
    Dispatcher.dispatch({
      action: ACTION.EDIT,
      value: value,
      key: key
    });
  },
  Update: function (key, value) {
    Dispatcher.dispatch({
      action: ACTION.UPDATE,
      value: value,
      key: key
    });
  }

};