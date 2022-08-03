import React from "react";
import  ReactDOM  from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import Distance from "../components/distance/Distance";
import { fireEvent, render, screen } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();
import userEvent from "@testing-library/user-event";

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    ReactDOM.render(<Distance></Distance>, div);

});

it('checkbox inside center works', () => {
    render(<Distance />)
    const checkbox = screen.getByTestId("inside-center")
    
   
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    
  })

it('checkbox 0-2center works', () => {
  render(<Distance />)
  const checkbox = screen.getByTestId("0-2center")
  
 
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  
})

it('checkbox 2-5center works', () => {
    render(<Distance />)
    const checkbox = screen.getByTestId("2-5center")
    
   
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    
  })

  it('checkbox 5-10 center works', () => {
    render(<Distance />)
    const checkbox = screen.getByTestId("5-10center")
    
   
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    
  })

  it('checkbox 10+ center works', () => {
    render(<Distance />)
    const checkbox = screen.getByTestId("10+center")
    
   
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    
  })

  




