import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import Login from "../pages/login/Login";
import { fireEvent, render, screen } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();

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

it("Login Page renders without crashing", () => {
  
    const div = document.createElement("div");
    render(<Login></Login>, div);

});

it('Log In Button redirects after click', () => {

    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    )
   
    const input1 = screen.getByTestId('email');
    fireEvent.change(input1, {target: {value: 'Jest1'}});
  
   
    const input2 = screen.getByTestId('password');
    fireEvent.change(input2, {target: {value: 'Nebraska123!'}});
  
    
   
    const login = screen.getByTestId('login');
    expect(login).toBeEnabled();
    fireEvent.click(login);
  
   
  })