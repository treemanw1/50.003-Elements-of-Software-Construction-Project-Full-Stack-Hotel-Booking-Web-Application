import React from "react";
import  ReactDOM  from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import Rating from "../components/rating/Rating";
import { fireEvent, render, screen } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();
import userEvent from "@testing-library/user-event";

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    ReactDOM.render(<Rating></Rating>, div);

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



