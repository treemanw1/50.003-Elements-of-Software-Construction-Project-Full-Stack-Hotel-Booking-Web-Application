import React from "react";
import  ReactDOM  from 'react-dom';
import { render, fireEvent, screen,within, configure } from "@testing-library/react";
import Hotels from "../pages/Hotels";

import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));


it("renders without crashing", () => {
  
    const div = document.createElement("div");
    ReactDOM.render(Hotels, div);
});


/*
it('Date Picker opens onClick', () => {
    render(
        <BrowserRouter>
            <DestinationSearchPage/>
        </BrowserRouter>
    )
    const span = screen.getByTestId('date-span');
    fireEvent.click(span);
    const date = screen.getByTestId('DateRange');
    expect(date).toBeInTheDocument();
  });

*/











