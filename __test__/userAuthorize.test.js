const request = require('supertest');
const express = require('express');
const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');
const checkUserRole = require('../middlewares/userAuthorize');

jest.mock('../models');
jest.mock('../helpers/jwt');

const app = express();
app.use(express.json());

const CartController = {
  getAllCartItems: (req, res) => {
    res.status(200).json({ message: "Access granted" });
  }
};

app.get('/cart/list/:id', checkUserRole, CartController.getAllCartItems);

describe('User Role Authorization Middleware', () => {
  let mockToken;
  let mockUser;

  beforeAll(() => {
    // Mock data user
    mockUser = { id: 1, username: 'testuser', roleUser: 'user' };
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

  test('should authorize user with correct role', async () => {
    const response = await request(app).get('/cart/list/1').set('token', mockToken);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Access granted");
  });

  test('should return 403 if user role is not user', async () => {
    // Mock user with different role
    mockUser.roleUser = 'admin';
    const response = await request(app).get('/cart/list/1').set('token', mockToken);
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('User is not authorized');
  });

  test('should return 500 if token is not provided', async () => {
    const response = await request(app).get('/cart/list/1');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal Server Error");
  });

  test('should return 500 for server errors', async () => {
    User.findOne.mockImplementation(() => {
      throw new Error('Database error');
    });
    const response = await request(app).get('/cart/list/1').set('token', mockToken);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal Server Error");
  });
});
