import React from "react";
import Note from "./note";
import Dispatcher from "../dispatcher/dispatcher";
import ACTION from "../constants/actions";

let mockedDispatch = null;

describe("Action Note", () => {
  beforeEach(() => {
      mockedDispatch = jest.fn();
      Dispatcher.dispatch = mockedDispatch;
  });
  it("When add is called, should dispatch {action: ADD, value: `blah`}", () => {
      Note.Add("blah");
      let param = mockedDispatch.mock.calls[0][0];
      expect(param.action).toBe(ACTION.ADD);
      expect(param.value).toBe("blah");
  });
  it("When delete is called, should dispatch {action: DELETE, value: 0}", () => {
      Note.Delete(0);
      let param = mockedDispatch.mock.calls[0][0];
      expect(param.action).toBe(ACTION.DELETE);
      expect(param.value).toBe(0);
  });
 it("When edit is called, should dispatch {action: EDIT, value: `test` and key: 0}", () => {
      Note.Edit(0, "test");
      let param = mockedDispatch.mock.calls[0][0];
      expect(param.action).toBe(ACTION.EDIT);
      expect(param.value).toBe("test");
      expect(param.key).toBe(0);
  }); 
  it("When update is called, should dispatch {action: UPDATE, value: `test` and key: 0}", () => {
      Note.Update(0, "test");
      let param = mockedDispatch.mock.calls[0][0];
      expect(param.action).toBe(ACTION.UPDATE);
      expect(param.value).toBe("test");
      expect(param.key).toBe(0);
  });
});