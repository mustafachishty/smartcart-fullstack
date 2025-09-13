export const CATEGORIES = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Health & Beauty'
];

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured', field: 'rating' as const, direction: 'desc' as const },
  { label: 'Price: Low to High', value: 'price-asc', field: 'price' as const, direction: 'asc' as const },
  { label: 'Price: High to Low', value: 'price-desc', field: 'price' as const, direction: 'desc' as const },
  { label: 'Best Rating', value: 'rating', field: 'rating' as const, direction: 'desc' as const },
  { label: 'Newest', value: 'newest', field: 'name' as const, direction: 'desc' as const }
];

export const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity }
];

export const RATING_FILTERS = [
  { label: 'All Ratings', value: 0 },
  { label: '4+ Stars', value: 4 },
  { label: '3+ Stars', value: 3 },
  { label: '2+ Stars', value: 2 },
  { label: '1+ Stars', value: 1 }
];