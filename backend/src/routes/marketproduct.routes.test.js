const request = require('supertest');
const app = require('../server');
const MarketplaceProduct = require('../models/marketproduct.model');

describe('Market Product Routes', () => {
  // Test GET /api/v1/marketproducts
  describe('GET /', () => {
    it('should get all market products', async () => {
      const response = await request(app)
        .get('/api/v1/marketproducts')
        .expect(200);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('data');
    });
  });

  // Test GET /api/v1/marketproducts/:categoryId
  describe('GET /:categoryId', () => {
    it('should get products by category', async () => {
      const categoryId = '67705f9b65fe2ba532c1c18d';
      const response = await request(app)
        .get(`/api/v1/marketproducts/${categoryId}`)
        .expect(200);
      expect(response.body).toHaveProperty('ok', true);
    });
  });

  // Test POST /api/v1/marketproducts
  describe('POST /', () => {
    it('should create a new market product', async () => {
      const newProduct = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        category: '67705f9b65fe2ba532c1c18d'
      };

      const response = await request(app)
        .post('/api/v1/marketproducts')
        .send(newProduct)
        .expect(201);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body.data).toHaveProperty('name', newProduct.name);
    });
  });

  // Test PUT /api/v1/marketproducts/:id
  describe('PUT /:id', () => {
    it('should update a market product', async () => {
      const productId = '678bad2a71f98f38080a51fe';
      const updateData = {
        name: 'Updated Product'
      };

      const response = await request(app)
        .put(`/api/v1/marketproducts/${productId}`)
        .send(updateData)
        .expect(200);
      expect(response.body).toHaveProperty('ok', true);
    });
  });

});