import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Rating from "../components/rating/Rating";
import { fireEvent, render, screen } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();
import userEvent from "@testing-library/user-event";

import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    render(<Rating></Rating>, div);

});

it('checkbox five star works', () => {
  render(<Rating />)
  const checkbox = screen.getByTestId("five")
  
 
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  
})

it('checkbox four star works', () => {
  render(<Rating />)
  const checkbox = screen.getByTestId("four")
  
 
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  
})


it('checkbox three star works', () => {
  render(<Rating />)
  const checkbox = screen.getByTestId("three")
  
 
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  
})


it('checkbox two star works', () => {
  render(<Rating />)
  const checkbox = screen.getByTestId("two")
  
 
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  
})


it('checkbox one star works', () => {
  render(<Rating />)
  const checkbox = screen.getByTestId("one")
  
 
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  
})



