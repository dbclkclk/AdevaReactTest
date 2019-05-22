import React from "react";
import { shallow, mount } from 'enzyme';
import List from "./List";
import NotesStore from "../stores/notesstore";
import NoteAction from "../actions/note";
import {chaiexpect} from "../../tests/ulils";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faBinoculars, faEdit} from '@fortawesome/free-solid-svg-icons';

let mockaddChangeListener = jest.fn();
let mockGetState = jest.fn();
let mockDelete = jest.fn();
let mockEdit = jest.fn();
NotesStore.addChangeListener = (fn) => mockaddChangeListener = fn;
NotesStore.getState = mockGetState;
NoteAction.Delete = mockDelete;
NoteAction.Edit = mockEdit;

describe("List Component", () => {
  it("it should render initial dom", () => {
    const wrapper = shallow(<List />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
  it("it should fetch the initial notes and display it", () => {
    mockGetState.mockReturnValue(["tttt", "dddd", "ggggg"]);
    const wrapper = mount(<List />);
    wrapper.update();
    chaiexpect(wrapper.find("li")).to.have.length(3);
  });
  it("if I should search, for `tttt`, it should only display one match", () => {
    mockGetState.mockReturnValue(["tttt", "dddd", "ggggg"]);
    const wrapper = mount(<List />);
    wrapper.find("#search").at(0).simulate('change', {target: {value: 'tttt', name: 'search'}});
    wrapper.update();
    chaiexpect(wrapper.find("li")).to.have.length(1);
  });
  it("Clicking on view should open modal", () => {
    mockGetState.mockReturnValue(["tttt", "dddd", "ggggg"]);
    const wrapper = mount(<List />);
    wrapper.find("li").at(0).find("a").at(2).simulate("click");
    wrapper.update();
    expect(wrapper.find('.modal-dialog').exists()).toEqual(true);
  });
  it("When click delete, should call delete", () => {
    mockGetState.mockReturnValue(["tttt", "dddd", "ggggg"]);
    const wrapper = mount(<List />);
    wrapper.find("li").at(0).find("a").at(1).simulate("click");
    wrapper.update();
    expect(mockDelete).toHaveBeenCalled();
  });
  it("When click edit, should call edit", () => {
    mockGetState.mockReturnValue(["tttt", "dddd", "ggggg"]);
    const wrapper = mount(<List />);
    wrapper.find("li").at(0).find("a").at(0).simulate("click");
    wrapper.update();
    expect(mockEdit).toHaveBeenCalled();
  });
});