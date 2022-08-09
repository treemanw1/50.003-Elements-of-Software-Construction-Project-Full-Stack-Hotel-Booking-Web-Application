import React from "react";
import { act } from 'react-dom/test-utils';
require('dotenv').config();
import { render, fireEvent, screen,within, configure } from "@testing-library/react";
import DestinationSearchPage from "../pages/Destination search page/DestinationSearchPage";
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';
const mockedUsedNavigate = jest.fn();

const app = require('../../../server/testserver')
const supertest = require('supertest');
const request = supertest(app)

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));


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

  it('gets the test endpoint /', async() => {
    const response = await request.get('/')
  
    expect(response.status).toBe(200)
  
 
  })

  it('gets the test endpoint /api/destinations', async() => {
    const response = await request.get('/api/destinations')
    
  
    expect(response.status).toBe(200)
  
 
  }, 20000)

  it('gets the test endpoint query regular hotel info', async() => {
    const response = await request.get('/api/hotels/destinationID/:H1cz/:2022-08-31/:2022-09-01/:1')
    console.log(response.body)
    expect(response.status).toBe(200)
    
 
  }, 20000)

  it('gets the test endpoint hotel info + pricing', async() => {
    const response = await request.get('/api/hotelsPricing/destinationID/:RsBU/:2022-08-31/:2022-09-01/:1')
    
    expect(response.status).toBe(200)
    
 
  }, 20000)

  

it("renders without crashing", () => {
    const div = document.createElement("div");
    
    act(() => {
        /* fire events that update state */
        render(<DestinationSearchPage></DestinationSearchPage>, {wrapper: MemoryRouter},div);
      });
});

it('should be enabled', () => {
    const { getByTestId } = render(<DestinationSearchPage />,{wrapper: MemoryRouter});
    expect(getByTestId('Where')).toHaveTextContent("Where")
    expect(getByTestId('are you')).toHaveTextContent("are you")
    expect(getByTestId('travelling to?')).toHaveTextContent("travelling to?")
    expect(getByTestId('DESTINATION')).toHaveTextContent("DESTINATION")
    expect(getByTestId('checkin')).toHaveTextContent("CHECK-IN CHECK-OUT DATES")
    expect(getByTestId('ADULTS')).toHaveTextContent("ADULTS")
    expect(getByTestId('CHILDREN')).toHaveTextContent("CHILDREN")
    expect(getByTestId('ROOMS')).toHaveTextContent("ROOMS")
    
  });


  it('- button disabled at first in adult count', () => {
    act(() => {
        /* fire events that update state */
        render(
            <BrowserRouter>
                <DestinationSearchPage/>
            </BrowserRouter>
        )
      });
    
    const span = screen.getByTestId('adult-span');
    fireEvent.click(span);
   
    const minus = screen.getByTestId('adult-minus');
    expect(minus).not.toBeEnabled;
    
})

  it('+/- button increases/decreases adult count', () => {
    act(() => {
        /* fire events that update state */
        render(
            <BrowserRouter>
                <DestinationSearchPage/>
            </BrowserRouter>
        )
      });
    
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
    act(() => {
        /* fire events that update state */
        render(
            <BrowserRouter>
                <DestinationSearchPage/>
            </BrowserRouter>
        )
      });
    
    const span = screen.getByTestId('children-span');
    fireEvent.click(span);
   
    const minus = screen.getByTestId('children-minus');
    expect(minus).not.toBeEnabled;
    
})

it('+/- button increases/decreases children count', () => {
    act(() => {
        /* fire events that update state */
        render(
            <BrowserRouter>
                <DestinationSearchPage/>
            </BrowserRouter>
        )
      });
 
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
    act(() => {
        /* fire events that update state */
        render(
            <BrowserRouter>
                <DestinationSearchPage/>
            </BrowserRouter>
        )
      });
    
    const span = screen.getByTestId('rooms-span');
    fireEvent.click(span);
   
    const minus = screen.getByTestId('rooms-minus');
    expect(minus).not.toBeEnabled;
    
})


it('+/- button increases/decreases adult count', () => {
    act(() => {
        /* fire events that update state */
        render(
            <BrowserRouter>
                <DestinationSearchPage/>
            </BrowserRouter>
        )
      });
  
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
    const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    expect(alertMock).toBeCalledTimes(1);
})


/*
You don't need to test the browser's behavior in tests. Because this behavior has already been tested by the Mozilla, Google, etc before the release. All you need to do is to test that the behavior is triggered correctly. In your situation it will be something like this:
*/










