import React from "react";
import List from "./components/List";
import Display from "./components/Display";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faBinoculars, faEdit} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faBinoculars, faEdit);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div className="container">
            <h1>Notetaking App</h1>
            <div className="row">
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <List />
              </div>
              <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <Display />
              </div>
            </div>
        </div>
      );
  }
}