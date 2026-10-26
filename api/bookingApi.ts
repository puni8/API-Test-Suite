import { APIRequestContext } from '@playwright/test';
import { Endpoints } from '../config/endpoints';
import { Booking } from '../models/booking.model';

export class BookingApi {
  constructor(private request: APIRequestContext) {}

  async getAllBookings() {
    return await this.request.get(Endpoints.booking, {
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  async getBookingById(id: number) {
    return await this.request.get(Endpoints.bookingById(id), {
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  async createBooking(booking: Booking) {
    return await this.request.post(Endpoints.booking, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: booking,
    });
  }

  async updateBooking(id: number, booking: Booking, token: string) {
    return await this.request.put(Endpoints.bookingById(id), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`,
      },
      data: booking,
    });
  }

  async partialUpdateBooking(id: number, partialData: Partial<Booking>, token: string) {
    return await this.request.patch(Endpoints.bookingById(id), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`,
      },
      data: partialData,
    });
  }

  async deleteBooking(id: number, token: string) {
    return await this.request.delete(Endpoints.bookingById(id), {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`,
      },
    });
  }

  async ping() {
    return await this.request.get(Endpoints.ping);
  }
}

