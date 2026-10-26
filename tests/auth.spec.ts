import { test, expect } from '@playwright/test';
import { AuthApi } from '../api/authApi';

test.describe('Auth API Tests', () => {
  let authApi: AuthApi;

  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
  });

  test('should create auth token successfully with valid credentials', async () => {
    const response = await authApi.createToken('admin', 'password123');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
  });

  test('should fail to create token with invalid credentials', async () => {
    const response = await authApi.createToken('invalid', 'wrong');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });

  test('should fail to create token with missing username', async () => {
    const response = await authApi.createToken('', 'password123');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });
});

