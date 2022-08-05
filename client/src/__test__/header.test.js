import React from "react";

import Header from "../components/header/Header";
import { render, fireEvent, screen,within, configure } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
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

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    render(<Header></Header>, div);

});


it('- button disabled at first in adult count', () => {

  render(
      <BrowserRouter>
          <Header/>
      </BrowserRouter>
  )
  const span = screen.getByTestId('adult-span-header');
  fireEvent.click(span);
 
  const minus = screen.getByTestId('adult-minus-header');
  expect(minus).not.toBeEnabled;
  
})

it('+/- button increases/decreases adult count', () => {

  render(
      <BrowserRouter>
          <Header/>
      </BrowserRouter>
  )
  const span = screen.getByTestId('adult-span-header');
  fireEvent.click(span);
  const plus = screen.getByTestId('adult-plus-header');
  fireEvent.click(plus);
  expect(screen.getByTestId('adult-span-header')).toHaveTextContent("2");
  const minus = screen.getByTestId('adult-minus-header');
  fireEvent.click(minus);
  expect(screen.getByTestId('adult-span-header')).toHaveTextContent("1");


  
})

it('- button disabled at first in children count', () => {

  render(
      <BrowserRouter>
          <Header/>
      </BrowserRouter>
  )
  const span = screen.getByTestId('children-span-header');
  fireEvent.click(span);
 
  const minus = screen.getByTestId('children-minus-header');
  expect(minus).not.toBeEnabled;
  
})

it('+/- button increases/decreases children count', () => {

render(
    <BrowserRouter>
        <Header/>
    </BrowserRouter>
)
const span = screen.getByTestId('children-span-header');
fireEvent.click(span);
const plus = screen.getByTestId('children-plus-header');
fireEvent.click(plus);
expect(screen.getByTestId('children-span-header')).toHaveTextContent("1");
const minus = screen.getByTestId('children-minus-header');
fireEvent.click(minus);
expect(screen.getByTestId('children-span-header')).toHaveTextContent("0");


})

it('- button disabled at first in rooms count', () => {

  render(
      <BrowserRouter>
          <Header/>
      </BrowserRouter>
  )
  const span = screen.getByTestId('rooms-span-header');
  fireEvent.click(span);
 
  const minus = screen.getByTestId('rooms-minus-header');
  expect(minus).not.toBeEnabled;
  
})


it('+/- button increases/decreases adult count', () => {

render(
    <BrowserRouter>
        <Header/>
    </BrowserRouter>
)
const span = screen.getByTestId('rooms-span-header');
fireEvent.click(span);
const plus = screen.getByTestId('rooms-plus-header');
fireEvent.click(plus);
expect(screen.getByTestId('rooms-span-header')).toHaveTextContent("2");
const minus = screen.getByTestId('rooms-minus-header');
fireEvent.click(minus);
expect(screen.getByTestId('rooms-span-header')).toHaveTextContent("1");


})

it('modifySearchBtn redirects after click', () => {

  render(
      <BrowserRouter>
          <Header/>
      </BrowserRouter>
  )
  const search = screen.getByTestId('modifySearchBtn');
  expect(search).toBeEnabled();
  fireEvent.click(search);
  


  expect(mockedUsedNavigate).toBeCalledTimes(1);
})

it('SearchBar accepts user input', () => {

  render(
      <BrowserRouter>
          <Header/>
      </BrowserRouter>
  )
  const input1 = screen.getByTestId('SearchBar');
    fireEvent.change(input1, {target: {value: 'Bali'}});
  


})

