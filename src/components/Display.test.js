import React from "react";
import { shallow, mount } from 'enzyme';
import Display from "./Display";
import NoteStore from "../stores/notestore";
import NoteAction from "../actions/note";

let mockaddChangeListener = jest.fn();
NoteStore.addChangeListener = (fn) => mockaddChangeListener = fn;
let mockgetState = jest.fn();
NoteStore.getState = mockgetState;

let mockAdd = jest.fn();
let mockUpdate = jest.fn();
NoteAction.Add = mockAdd;
NoteAction.Update = mockUpdate;

describe("Display Component", () => {
  it("it should render initial dom", () => {
    const wrapper = shallow(<Display />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
  it("Test that when note change, loads data from store and display it in DOM", () => {
    const component = mount(<Display />);
    mockgetState.mockReturnValue({value:"blah blah", key: null});
    mockaddChangeListener();
    component.update();
    expect(component.find("#note").at(1).props().value).toBe("blah blah");
  });
  it("Test that when note is being added, it adds it", () => {
    const component = mount(<Display />);
    component.find("#note").at(0).simulate('change', {target: {value: 'my value', name: 'note'}});
    component.find("#note").at(1).simulate('change', {target: {value: 'my value', name: 'note'}});
    const form = component.find('form').at(0);
    form.simulate('submit');
    expect(mockAdd.mock.calls[0][0]).toBe("my value");
  });
  it("Test when note is being edited, it calls update", () => {
    const component = mount(<Display />);
    mockgetState.mockReturnValue({value:"blah blah", key: 1});
    mockaddChangeListener();
    component.update();
    component.find("#note").at(0).simulate('change', {target: {value: 'new value', name: 'note'}});
    component.find("#note").at(1).simulate('change', {target: {value: 'new value', name: 'note'}});
    const form = component.find('form').at(0);
    form.simulate('submit');
    expect(mockUpdate.mock.calls[0][0]).toBe(1);
    expect(mockUpdate.mock.calls[0][1]).toBe("new value");
  });
  
});