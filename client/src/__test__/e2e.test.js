import React from 'react';
import { render, fireEvent, cleanup, screen, within, configure, waitForElement, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom/extend-expect';

import Single from '../components/single/Single';
import DestinationSearchPage from "../pages/Destination search page/DestinationSearchPage";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') ,
 useNavigate: () => mockedUsedNavigate,
}));

const app1 = require('../../../server/testserver')
const supertest = require('supertest');
const request_testserver = supertest(app1)

import express from 'express';
import router from '../../../server/router/booking';
import request from 'supertest';

const app2 = new express();
app2.use('/', router);

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

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


let mockedOptions = [];

it('Gets options for dropdown from /api/destinations', async () => {
  const response = await request_testserver.get('/api/destinations')


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

it('gets the hotel info + pricing', async () => {


  const response = await request_testserver.get('/api/hotelsPricing/destinationID/A6Dz/2022-08-31/2022-09-01/1')

  expect(response.status).toBe(200)
  const arr = response.body
  //console.log(arr[0]) //xPG9 freedom traveller

}, 20000)

it('gets the room info', async () => {
  const response = await request_testserver.get('/api/rooms/A6Dz/xPG9/2022-08-31/2022-09-01/1')
  //console.log(response.body)
  expect(response.status).toBe(200)


}, 20000)

const firstname = generateString(5);
const lastname = generateString(4);
const phonenumber = 11111111;
let suff = "gmail.com";
let pref = generateString(5);
const emailaddress = pref+suff;
const creditcardnumber = "1111111111111111";
const expirydate = "01/30";
const cvv = "414";
const specialrequests = "I want wifi";
const hotelInfo = { id: 'xPG9', name: 'Freedom Traveller', description: undefined, rating: 2, address: 'Via Gaeta 23' };
const roomInfo = { "name": "Shared Dormitory, Women Only", "price": 47.34, "key": "er-702DCD14657386A58E88EA803C4812BD-535A24D107EA502394E59B3094973667", "img_link": undefined }

it('responds to /book', async () => {
  const response = await request(app2)
    .post('/book')
    .send({ firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv, specialrequests, hotelInfo, roomInfo });
  expect(response.body).toHaveProperty("message", "Booking made succesfully!");
}, 20000);









