import React from "react";
import  ReactDOM  from 'react-dom';
import SearchItem from "../components/searchItem/SearchItem";
import { render, fireEvent, screen,within } from "@testing-library/react";
const mockedUsedNavigate = jest.fn();
import {BrowserRouter} from "react-router-dom";
import DestinationSearchPage from "../pages/Destination search page/DestinationSearchPage";
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));

it("renders without crashing", () => {
  
    const div = document.createElement("div");
    ReactDOM.render(<SearchItem></SearchItem>, div);

});

it('Select Room button redirects after click', () => {

  render(
    <BrowserRouter>
        <DestinationSearchPage/>
    </BrowserRouter>
)
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


