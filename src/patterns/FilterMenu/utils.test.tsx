import { exampleAuctionLots } from './utils'; // Replace './your-file-name'

describe('exampleAuctionLots', () => {
  test('exampleAuctionLots is an array of the correct length', () => {
    expect(exampleAuctionLots).toHaveLength(14);
  });

  test('exampleAuctionLots contains objects of type lotType', () => {
    exampleAuctionLots.forEach((lot) => {
      expect(lot).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          lotNumber: expect.any(Number),
          title: expect.any(String),
          imageSrc: expect.any(String),
          maker: expect.any(String),
          price: expect.any(Number),
          collection: expect.any(String),
        }),
      );
    });
  });

  test('exampleAuctionLots contains specific lot data', () => {
    expect(exampleAuctionLots[0]).toEqual({
      id: 'lot-001',
      lotNumber: 1,
      title: 'Sunset Over the Hills',
      imageSrc: 'https://via.placeholder.com/150',
      maker: 'John Doe',
      price: 120000,
      collection: 'Modern Landscape Collection',
    });

    expect(exampleAuctionLots[5]).toEqual({
      id: 'lot-006',
      lotNumber: 6,
      title: 'Crashing Waves',
      imageSrc: 'https://via.placeholder.com/150',
      maker: 'David Wang',
      price: 95000,
      collection: 'Coastal Views Series',
    });

    // Add more specific checks as needed for other lots
  });

  test('All lot numbers are unique', () => {
    const lotNumbers = exampleAuctionLots.map((lot) => lot.lotNumber);
    expect(lotNumbers.length).toBe(new Set(lotNumbers).size);
  });

  test('All IDs are unique', () => {
    const lotIds = exampleAuctionLots.map((lot) => lot.id);
    expect(lotIds.length).toBe(new Set(lotIds).size);
  });
});
