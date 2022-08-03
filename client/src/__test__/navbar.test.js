import React from "react";
import  ReactDOM  from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { fireEvent, render, screen } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();

jest.spyOn(window, "open")

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    ReactDOM.render(<Navbar></Navbar>, div);

});


it('RegBtn redirects after click', () => {

  render(
      <BrowserRouter>
          <Navbar/>
      </BrowserRouter>
  )
  const register = screen.getByTestId('RegBtn');
  expect(register).toBeEnabled();
  fireEvent.click(register);

  // TODO something something check useNavigate
  // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
  expect(mockedUsedNavigate).toBeCalledTimes(1);
})

it('Trivago redirects after click', () => {

  render(
      <BrowserRouter>
          <Navbar/>
      </BrowserRouter>
  )
  const register = screen.getByTestId('trivago');
  expect(register).toBeEnabled();
  fireEvent.click(register);

  // TODO something something check useNavigate
  // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
  expect(mockedUsedNavigate).toBeCalledTimes(1);
  //https://v5.reactrouter.com/web/guides/testing/checking-location-in-tests
})
