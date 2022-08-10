import React from 'react';
import { render, fireEvent, cleanup, screen, within, configure, waitForElement, waitFor } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

import Single from '../components/single/Single';
import DestinationSearchPage from "../pages/Destination search page/DestinationSearchPage";

const app = require('../../../server/testserver')
const supertest = require('supertest');
const request = supertest(app)

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




    let mockedOptions = [];

    it('Gets options for dropdown from /api/destinations', async() => {
        const response = await request.get('/api/destinations')
        
      
        expect(response.status).toBe(200)

        mockedOptions = response.body
     
      }, 20000)
      it('Selects Rome,Italy as choice of destination', async () => {
        const mockedOnChange = jest.fn();
        const mockedOnInputChange = jest.fn();
        const { getByTestId, queryByTestId } = render(<Single
            options={mockedOptions}
            onChange={mockedOnChange}
            onInputChange={mockedOnInputChange}
        />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);

        const field = getByTestId('my-select-component').querySelector('input');
        //test 1
        fireEvent.change(field, { target: { value: 'Rome, Italy' } });
        fireEvent.click(screen.getByText('Rome, Italy'));
        expect(screen.getByText('Rome, Italy')).toBeInTheDocument();
        expect(mockedOnChange).toHaveBeenCalledTimes(1);

    });


    it('gets the hotel info + pricing', async() => {
      const response = await request.get('/api/hotelsPricing/destinationID/A6Dz/2022-08-31/2022-09-01/1')
      
      expect(response.status).toBe(200)
      const arr = response.body
      //console.log(arr[0]) //xPG9 freedom traveller
   
    }, 20000)
  
    it('gets the room info', async() => {
      const response = await request.get('/api/rooms/A6Dz/xPG9/2022-08-31/2022-09-01/1')
      console.log(response.body)
      expect(response.status).toBe(200)
      
   
    }, 20000)
  




