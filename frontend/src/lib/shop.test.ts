import { getShopIdByName } from './shop';
import type { Shop } from '../types/shop';

describe('Shop Utils', () => {
  const mockShops: Shop[] = [
    { _id: '1', name: 'Test Shop', description: '', openingTime: '', closingTime: '', rating: 0, orderCount: 0, isOpen: false, location: '', products: []},
    { _id: '2', name: 'Another Shop', description: '', openingTime: '', closingTime: '', rating: 0, orderCount: 0, isOpen: false, location: '', products: []},
    { _id: '3', name: 'Shop With Spaces', description: '', openingTime: '', closingTime: '', rating: 0, orderCount: 0, isOpen: false, location: '', products: []},
    { _id: '4', name: 'UPPERCASE SHOP', description: '', openingTime: '', closingTime: '', rating: 0, orderCount: 0, isOpen: false, location: '', products: []}
  ];

  it('should return correct ID when exact shop name matches', () => {
    const result = getShopIdByName('Test Shop', mockShops);
    expect(result).toBe('1');
  });

  it('should return undefined for non-existent shop', () => {
    const result = getShopIdByName('Non Existent Shop', mockShops);
    expect(result).toBeUndefined();
  });

  it('should be case insensitive', () => {
    const result = getShopIdByName('test shop', mockShops);
    expect(result).toBe('1');
  });

  it('should ignore spaces', () => {
    const result = getShopIdByName('TestShop', mockShops);
    expect(result).toBe('1');
  });
});