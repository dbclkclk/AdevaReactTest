import Notestore from "./notesstore.js";
import NoteAction from "../actions/note";

let setItemSpy =null; 
let getItemSpy =null; 

let mockEmitChange = jest.fn();
Notestore.emitChange = mockEmitChange;

describe("Notesstore Test", () => {
    beforeEach(() => {
        Notestore.emitChange = mockEmitChange;
        setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
        getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

    });
    it("Test Add that it takes the data and add it to the store", () => {
        getItemSpy.mockReturnValue(JSON.stringify(["test"]));
        NoteAction.Add("blah");
        expect(mockEmitChange).toHaveBeenCalled();
        expect(setItemSpy).toHaveBeenCalled();
        expect(getItemSpy).toHaveBeenCalled();
        let notes = setItemSpy.mock.calls[0][1];
        notes = JSON.parse(notes);
        expect(notes.length).toBe(2);
    });
});