import { test, expect } from '@playwright/test';
import { BookingApi } from '../api/bookingApi';
import { AuthApi } from '../api/authApi';
import { TestData } from '../helpers/testData';

test.describe('Booking API Tests', () => {
  let bookingApi: BookingApi;
  let authApi: AuthApi;
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    const authResponse = await authApi.createToken();
    const authBody = await authResponse.json();
    authToken = authBody.token;
  });

  test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
  });

  test('should check API health with ping', async () => {
    const response = await bookingApi.ping();
    
    expect(response.status()).toBe(201);
  });

  test('should get all bookings', async () => {
    const response = await bookingApi.getAllBookings();
    
    expect(response.status()).toBe(200);
    
    const bookings = await response.json();
    expect(Array.isArray(bookings)).toBe(true);
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings[0]).toHaveProperty('bookingid');
  });

  test('should create a new booking successfully', async () => {
    const newBooking = TestData.createBooking();
    
    const response = await bookingApi.createBooking(newBooking);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body).toHaveProperty('booking');
    expect(body.booking.firstname).toBe(newBooking.firstname);
    expect(body.booking.lastname).toBe(newBooking.lastname);
    expect(body.booking.totalprice).toBe(newBooking.totalprice);
  });

  test('should get booking by ID', async () => {
    const newBooking = TestData.createBooking();
    const createResponse = await bookingApi.createBooking(newBooking);
    const { bookingid } = await createResponse.json();
    
    const response = await bookingApi.getBookingById(bookingid);
    
    expect(response.status()).toBe(200);
    
    const booking = await response.json();
    expect(booking.firstname).toBe(newBooking.firstname);
    expect(booking.lastname).toBe(newBooking.lastname);
  });

  test('should update booking completely', async () => {
    const newBooking = TestData.createBooking();
    const createResponse = await bookingApi.createBooking(newBooking);
    const { bookingid } = await createResponse.json();
    
    const updatedBooking = TestData.createBooking({
      firstname: 'UpdatedName',
      totalprice: 200,
    });
    
    const response = await bookingApi.updateBooking(bookingid, updatedBooking, authToken);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.firstname).toBe('UpdatedName');
    expect(body.totalprice).toBe(200);
  });

  test('should partially update booking', async () => {
    const newBooking = TestData.createBooking();
    const createResponse = await bookingApi.createBooking(newBooking);
    const { bookingid } = await createResponse.json();
    
    const partialUpdate = {
      firstname: 'PartialUpdate',
      totalprice: 300,
    };
    
    const response = await bookingApi.partialUpdateBooking(bookingid, partialUpdate, authToken);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.firstname).toBe('PartialUpdate');
    expect(body.totalprice).toBe(300);
  });

  test('should delete booking', async () => {
    const newBooking = TestData.createBooking();
    const createResponse = await bookingApi.createBooking(newBooking);
    const { bookingid } = await createResponse.json();
    
    const response = await bookingApi.deleteBooking(bookingid, authToken);
    
    expect(response.status()).toBe(201);
  });

  test('should return 404 for non-existent booking', async () => {
    const response = await bookingApi.getBookingById(999999);
    
    expect(response.status()).toBe(404);
  });

  test('should return 403 for updating without authentication', async () => {
    const newBooking = TestData.createBooking();
    const createResponse = await bookingApi.createBooking(newBooking);
    const { bookingid } = await createResponse.json();
    
    const updatedBooking = TestData.createBooking();
    const response = await bookingApi.updateBooking(bookingid, updatedBooking, 'invalid-token');
    
    expect(response.status()).toBe(403);
  });

  test('should return 403 for deleting without authentication', async () => {
    const newBooking = TestData.createBooking();
    const createResponse = await bookingApi.createBooking(newBooking);
    const { bookingid } = await createResponse.json();
    
    const response = await bookingApi.deleteBooking(bookingid, 'invalid-token');
    
    expect(response.status()).toBe(403);
  });
});

