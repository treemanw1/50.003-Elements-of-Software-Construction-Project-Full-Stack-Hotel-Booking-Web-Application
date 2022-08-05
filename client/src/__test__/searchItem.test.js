import React from "react";
import SearchItem from "../components/searchItem/SearchItem";
import { render, fireEvent, screen,within } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();
import {BrowserRouter} from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';
import DestinationSearchPage from "../pages/Destination search page/DestinationSearchPage";
import '@testing-library/jest-dom/extend-expect';

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
    render(<SearchItem></SearchItem>, div);

});
/*
it('Select Room button redirects after click', () => {

  render(<DestinationSearchPage></DestinationSearchPage>, {wrapper: MemoryRouter});
  const search = screen.getByTestId('SearchBtn');
      expect(search).toBeEnabled();
      fireEvent.click(search);
    
  render(
    <BrowserRouter>
        <SearchItem></SearchItem>
    </BrowserRouter>
)
  const select = screen.getByTestId('selectRoom');
  expect(select).toBeEnabled();
  fireEvent.click(select);

  // TODO something something check useNavigate
  // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
  expect(mockedUsedNavigate).toBeCalledTimes(1);
})
*/


