export const Endpoints = {
  auth: '/auth',
  booking: '/booking',
  bookingById: (id: number) => `/booking/${id}`,
  ping: '/ping',
} as const;

