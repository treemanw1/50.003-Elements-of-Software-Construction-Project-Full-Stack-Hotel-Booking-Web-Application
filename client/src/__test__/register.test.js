import React from "react";
import  ReactDOM  from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import Register from "../pages/register/Register";
import { fireEvent, render, screen } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    ReactDOM.render(<Register></Register>, div);

});

it('SubmitBtn redirects after click', () => {

    render(
        <BrowserRouter>
            <Register/>
        </BrowserRouter>
    )
   
    const input1 = screen.getByTestId('firstname');
    fireEvent.change(input1, {target: {value: 'matti'}});
  
   
    const input2 = screen.getByTestId('lastname');
    fireEvent.change(input2, {target: {value: 'matti'}});
  
    
    const input3 = screen.getByTestId('phone');
    fireEvent.change(input3, {target: {value: '99999999'}});

    const input4 = screen.getByTestId('email');
    fireEvent.change(input4, {target: {value: 'matti@gmail.com'}});
  
   
    const input5 = screen.getByTestId('password');
    fireEvent.change(input5, {target: {value: 'matti'}});
  
    
    const input6 = screen.getByTestId('confirm');
    fireEvent.change(input6, {target: {value: 'matti'}});
  
    const submit = screen.getByTestId('SubmitBtn');
    expect(submit).toBeEnabled();
    fireEvent.click(submit);
  
    // TODO something something check useNavigate
    // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
    //expect(mockedUsedNavigate).toBeCalledTimes(1);
  })