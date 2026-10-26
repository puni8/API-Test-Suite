import { APIRequestContext } from '@playwright/test';
import { Endpoints } from '../config/endpoints';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async createToken(username: string = 'admin', password: string = 'password123') {
    return await this.request.post(Endpoints.auth, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username,
        password,
      },
    });
  }
}

