import React from "react";
import  ReactDOM  from 'react-dom';
import { render, fireEvent, screen,within, configure } from "@testing-library/react";
import DestinationSearchPage from "../pages/Destination search page/DestinationSearchPage";

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
    ReactDOM.render(<DestinationSearchPage></DestinationSearchPage>, div);
});

it('should be enabled', () => {
    const { getByTestId } = render(<DestinationSearchPage />);
    expect(getByTestId('Where')).toHaveTextContent("Where")
    expect(getByTestId('are you')).toHaveTextContent("are you")
    expect(getByTestId('travelling to?')).toHaveTextContent("travelling to?")
    expect(getByTestId('DESTINATION')).toHaveTextContent("DESTINATION")
    expect(getByTestId('checkin')).toHaveTextContent("CHECK-IN CHECK-OUT DATES")
    expect(getByTestId('ADULTS')).toHaveTextContent("ADULTS")
    expect(getByTestId('CHILDREN')).toHaveTextContent("CHILDREN")
    expect(getByTestId('ROOMS')).toHaveTextContent("ROOMS")
    
  });

  it('SearchBtn redirects after click', () => {

      render(
          <BrowserRouter>
              <DestinationSearchPage/>
          </BrowserRouter>
      )
      const search = screen.getByTestId('SearchBtn');
      expect(search).toBeEnabled();
      fireEvent.click(search);
      

      // TODO something something check useNavigate
      // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
      expect(mockedUsedNavigate).toBeCalledTimes(1);
  })


  it('- button disabled at first in adult count', () => {

    render(
        <BrowserRouter>
            <DestinationSearchPage/>
        </BrowserRouter>
    )
    const span = screen.getByTestId('adult-span');
    fireEvent.click(span);
   
    const minus = screen.getByTestId('adult-minus');
    expect(minus).not.toBeEnabled;
    
})

  it('+/- button increases/decreases adult count', () => {

    render(
        <BrowserRouter>
            <DestinationSearchPage/>
        </BrowserRouter>
    )
    const span = screen.getByTestId('adult-span');
    fireEvent.click(span);
    const plus = screen.getByTestId('adult-plus');
    fireEvent.click(plus);
    expect(screen.getByTestId('adult-span')).toHaveTextContent("2");
    const minus = screen.getByTestId('adult-minus');
    fireEvent.click(minus);
    expect(screen.getByTestId('adult-span')).toHaveTextContent("1");

    // TODO something something check useNavigate
    // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
    
})

it('- button disabled at first in children count', () => {

    render(
        <BrowserRouter>
            <DestinationSearchPage/>
        </BrowserRouter>
    )
    const span = screen.getByTestId('children-span');
    fireEvent.click(span);
   
    const minus = screen.getByTestId('children-minus');
    expect(minus).not.toBeEnabled;
    
})

it('+/- button increases/decreases children count', () => {

  render(
      <BrowserRouter>
          <DestinationSearchPage/>
      </BrowserRouter>
  )
  const span = screen.getByTestId('children-span');
  fireEvent.click(span);
  const plus = screen.getByTestId('children-plus');
  fireEvent.click(plus);
  expect(screen.getByTestId('children-span')).toHaveTextContent("1");
  const minus = screen.getByTestId('children-minus');
  fireEvent.click(minus);
  expect(screen.getByTestId('children-span')).toHaveTextContent("0");

  // TODO something something check useNavigate
  // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
  
})

it('- button disabled at first in rooms count', () => {

    render(
        <BrowserRouter>
            <DestinationSearchPage/>
        </BrowserRouter>
    )
    const span = screen.getByTestId('rooms-span');
    fireEvent.click(span);
   
    const minus = screen.getByTestId('rooms-minus');
    expect(minus).not.toBeEnabled;
    
})


it('+/- button increases/decreases adult count', () => {

  render(
      <BrowserRouter>
          <DestinationSearchPage/>
      </BrowserRouter>
  )
  const span = screen.getByTestId('rooms-span');
  fireEvent.click(span);
  const plus = screen.getByTestId('rooms-plus');
  fireEvent.click(plus);
  expect(screen.getByTestId('rooms-span')).toHaveTextContent("2");
  const minus = screen.getByTestId('rooms-minus');
  fireEvent.click(minus);
  expect(screen.getByTestId('rooms-span')).toHaveTextContent("1");

  // TODO something something check useNavigate
  // https://blog.logrocket.com/testing-react-router-usenavigate-hook-react-testing-library/
  
})
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

/*
You don't need to test the browser's behavior in tests. Because this behavior has already been tested by the Mozilla, Google, etc before the release. All you need to do is to test that the behavior is triggered correctly. In your situation it will be something like this:
*/










