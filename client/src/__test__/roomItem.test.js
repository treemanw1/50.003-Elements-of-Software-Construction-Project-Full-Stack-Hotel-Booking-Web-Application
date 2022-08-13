import React from "react";
import RoomItem from "../components/roomItem/RoomItem";
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
    render(<RoomItem></RoomItem>, div);

});

it('Book Now button redirects after click', () => {

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

  //expect(mockedUsedNavigate).toBeCalledTimes(1);

  render(
    <BrowserRouter>
        <RoomItem></RoomItem>
    </BrowserRouter>
)
  const book = screen.getByTestId('BookNow');
  expect(book).toBeEnabled();
  fireEvent.click(book);  
  
})



