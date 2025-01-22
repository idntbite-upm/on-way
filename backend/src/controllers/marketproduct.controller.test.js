const { 
    getAllMarketProducts,
    getProductsByCategory,
    getMarketProductById,
    createMarketProduct,
    updateMarketProduct,
    deleteMarketProduct
} = require('./marketproduct.controller');
const MarketplaceProduct = require('../models/marketproduct.model');

// Mock console to avoid logs in tests
console.log = jest.fn();

// Clear existing mock
jest.unmock('../models/marketproduct.model');

// Setup fresh mock
jest.mock('../models/marketproduct.model', () => {
    const mockSave = jest.fn().mockResolvedValue({
        _id: 'mock-id-123',
        name: 'Test Product',
        price: 100,
        inStock: true
    });

    return jest.fn().mockImplementation(data => ({
        ...data,
        _id: 'mock-id-123',
        save: mockSave
    }));
});

describe('MarketProduct Controllers', () => {
    // Increase timeout for all tests in this suite
    jest.setTimeout(10000);

    let req;
    let res;

    beforeEach(() => {
        req = {
            params: {},
            query: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('getAllMarketProducts', () => {
        it('should get all products successfully', async () => {
            const mockProducts = [
                { _id: '1', name: 'Product 1' },
                { _id: '2', name: 'Product 2' }
            ];

            MarketplaceProduct.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockProducts)
            });

            await getAllMarketProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ 
                ok: true, 
                data: mockProducts 
            });
        });

        it('should filter by category when provided', async () => {
            req.query.category = 'category1';
            const mockProducts = [{ _id: '1', name: 'Product 1' }];

            const mockWhere = jest.fn().mockReturnValue({
                equals: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockProducts)
                })
            });

            MarketplaceProduct.find = jest.fn().mockReturnValue({
                where: mockWhere
            });

            await getAllMarketProducts(req, res);

            expect(mockWhere).toHaveBeenCalledWith('category');
        });
    });

    describe('getProductsByCategory', () => {
        it('should get products by category successfully', async () => {
            req.params.categoryId = 'category1';
            const mockProducts = [{ _id: '1', name: 'Product 1' }];

            MarketplaceProduct.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    lean: jest.fn().mockReturnValue({
                        exec: jest.fn().mockResolvedValue(mockProducts)
                    })
                })
            });

            await getProductsByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                ok: true,
                count: 1,
                data: mockProducts
            });
        });
    });

    describe('getMarketProductById', () => {
        it('should get product by id successfully', async () => {
            req.params.id = 'validId';
            const mockProduct = { _id: 'validId', name: 'Product' };

            MarketplaceProduct.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockProduct)
            });

            await getMarketProductById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                ok: true,
                data: mockProduct
            });
        });
    });

    describe('deleteMarketProduct', () => {
        it('should delete product successfully', async () => {
            req.params.id = 'validId';
            const mockProduct = { _id: 'validId', name: 'Product' };

            MarketplaceProduct.findById = jest.fn().mockResolvedValue(mockProduct);
            MarketplaceProduct.findByIdAndDelete = jest.fn().mockResolvedValue(mockProduct);

            await deleteMarketProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                ok: true,
                data: mockProduct
            });
        });

        it('should return 404 when product not found', async () => {
            req.params.id = 'invalidId';
            MarketplaceProduct.findById = jest.fn().mockResolvedValue(null);

            await deleteMarketProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                ok: false,
                msg: 'Product not found'
            });
        });
    });
});