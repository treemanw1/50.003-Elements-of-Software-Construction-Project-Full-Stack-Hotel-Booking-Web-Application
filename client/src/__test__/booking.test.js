import React from "react";
import  ReactDOM  from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import Book from '../pages/booking/Book'
import { fireEvent, render, screen } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    ReactDOM.render(<Book></Book>, div);

});

it('SubmitBtn redirects after click', () => {

    render(
        <BrowserRouter>
            <Book/>
        </BrowserRouter>
    )
   
    const input1 = screen.getByTestId('firstname-book');
    fireEvent.change(input1, {target: {value: 'matti'}});
  
   
    const input2 = screen.getByTestId('lastname-book');
    fireEvent.change(input2, {target: {value: 'matti'}});
  
   
    const input3 = screen.getByTestId('phone-book');
    fireEvent.change(input3, {target: {value: '99999999'}});
  
   
    const input4 = screen.getByTestId('email-book');
    fireEvent.change(input4, {target: {value: 'matti@gmail.com'}});
  
   
    const input5 = screen.getByTestId('card-book');
    fireEvent.change(input5, {target: {value: 'matti'}});
  
   
    const input6 = screen.getByTestId('expiry-book');
    fireEvent.change(input6, {target: {value: 'matti'}});

   
    const input7 = screen.getByTestId('cvv-book');
    fireEvent.change(input7, {target: {value: 'matti'}});
  
    const submit = screen.getByTestId('BookBtn');
    expect(submit).toBeEnabled();
    fireEvent.click(submit);
  
    // TODO something something check useNavigate
    // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
    //expect(mockedUsedNavigate).toBeCalledTimes(1);
  })