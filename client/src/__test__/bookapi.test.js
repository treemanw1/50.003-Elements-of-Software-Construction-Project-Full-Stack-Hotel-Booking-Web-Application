import request from 'supertest';
import express from 'express';
import router from '../../../server/router/booking';


import '@testing-library/jest-dom/extend-expect';
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const app = new express();
app.use('/', router);

describe('Testing bookings', function () {
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
    const response = await request(app)
    .post('/book')
    .send({firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv, specialrequests, hotelInfo, roomInfo });
    console.log(response.body)
  expect(response.body).toHaveProperty("message", "Booking made succesfully!");
  }, 20000);

});