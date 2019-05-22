import Notestore from "./notestore.js";
import NoteAction from "../actions/note";
let mockEmitChange = jest.fn();

describe("Notestore Test", () => {
    beforeEach(() => {
        Notestore.emitChange = mockEmitChange;
    });
    it("Test Edit that it takes the data and stores it", () => {
        NoteAction.Edit(1, "blah");
        expect(mockEmitChange).toHaveBeenCalled();
        let state = Notestore.getState();
        expect(state.key).toBe(1);
        expect(state.value).toBe("blah");
    });
});