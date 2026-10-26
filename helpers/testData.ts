import { Booking } from '../models/booking.model';

export class TestData {
  static generateRandomString(length: number = 8): string {
    return Math.random().toString(36).substring(2, length + 2);
  }

  static getFutureDate(daysFromNow: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }

  static createBooking(overrides?: Partial<Booking>): Booking {
    const randomStr = this.generateRandomString(6);
    return {
      firstname: `John${randomStr}`,
      lastname: `Doe${randomStr}`,
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: this.getFutureDate(7),
        checkout: this.getFutureDate(14),
      },
      additionalneeds: 'Breakfast',
      ...overrides,
    };
  }
}
