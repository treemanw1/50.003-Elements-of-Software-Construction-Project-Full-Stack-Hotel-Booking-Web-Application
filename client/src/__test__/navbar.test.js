import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
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
jest.spyOn(window, "open")

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    render(<Navbar></Navbar>, div);

});

it('LoginBtn redirects after click', () => {

  render(
      <BrowserRouter>
          <Navbar/>
      </BrowserRouter>
  )
  const login = screen.getByTestId('LoginBtn');
  expect(login).toBeEnabled();
  fireEvent.click(login);

  // TODO something something check useNavigate
  // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
  expect(mockedUsedNavigate).toBeCalledTimes(1);
})

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
