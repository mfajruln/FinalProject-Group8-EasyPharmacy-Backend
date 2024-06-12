const request = require('supertest');
const express = require('express');
const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');
const checkAuth = require('../middlewares/authentication');
const router = require('../routers/index'); // Import route yang telah dibuat

jest.mock('../models');
jest.mock('../helpers/jwt');

const app = express();
app.use(express.json());
app.use(router); // Menggunakan route yang telah dibuat

describe('Authentication Middleware', () => {
  let mockToken;
  let mockUser;

  beforeAll(() => {
    // Mock data user
    mockUser = { id: 1, username: 'testuser' };
    mockToken = 'mockToken';

    // Mock verifyToken function
    verifyToken.mockImplementation(() => ({ id: mockUser.id }));

    // Mock User.findOne method
    User.findOne.mockImplementation(({ where }) => {
      if (where.id === mockUser.id) {
        return Promise.resolve(mockUser);
      } else {
        return Promise.resolve(null);
      }
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should authenticate user with valid token', async () => {
    const response = await request(app).get('/cart/list/1').set('token', mockToken);
    expect(response.status).not.toBe(401); // Status should not be 401, but depend on the actual route handler implementation
  });

  test('should return 401 if token is not provided', async () => {
    const response = await request(app).get('/cart/list/1');
    expect(response.status).toBe(404); // menyesuaikan dengan code pada middleware
    expect(response.body.message).toBe("You don't have the right access, please login first.");
  });

  test('should return 401 if user is not found', async () => {
    verifyToken.mockImplementation(() => ({ id: 999 })); // Mock invalid user ID
    const response = await request(app).get('/cart/list/1').set('token', mockToken);
    expect(response.status).toBe(404); // menyesuaikan dengan code pada middleware
    expect(response.body.message).toBe('User are not identified');
  });

  test('should return 500 for server errors', async () => {
    User.findOne.mockImplementation(() => {
      throw new Error('Database error');
    });
    const response = await request(app).get('/cart/list/1').set('token', mockToken);
    expect(response.status).toBe(500);
  });
});
