
require('dotenv').config();

import { unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom/extend-expect';
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

  it('tests endpoint /', async() => {
    const response = await request.get('/')
  
    expect(response.status).toBe(200)
  
 
  })

  it('tests the endpoint /api/destinations', async() => {
    const response = await request.get('/api/destinations')
    
    expect(response.status).toBe(200)
    
  
 
  }, 20000)


  it('gets the hotel info + pricing', async() => {
    const response = await request.get('/api/hotelsPricing/destinationID/A6Dz/2022-08-31/2022-09-01/1')
    
    expect(response.status).toBe(200)
    const arr = response.body
    //console.log(arr[0]) //xPG9 freedom traveller
 
  }, 20000)

  it('gets the room info', async() => {
    const response = await request.get('/api/rooms/A6Dz/xPG9/2022-08-31/2022-09-01/1')
    //console.log(response.body)
    expect(response.status).toBe(200)
    
 
  }, 20000)

  


  








