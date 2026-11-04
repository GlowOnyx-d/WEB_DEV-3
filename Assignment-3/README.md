# Inventory API
1. `npm install`
2. Copy `.env.example` to `.env` (start MongoDB locally or use an Atlas URI)
3. `npm start` -> http://localhost:5000

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/products | Create |
| GET | /api/products?category=&search=&minPrice=&maxPrice=&inStock=&sort=-price&page=1&limit=10 | List/filter/sort/paginate |
| GET | /api/products/:id | Single product |
| PUT | /api/products/:id | Update |
| PATCH | /api/products/:id/stock | `{ "change": 10 }` restock, `{ "change": -3 }` sale |
| DELETE | /api/products/:id | Delete |
| GET | /api/products/low-stock | quantity <= reorderLevel |
| GET | /api/products/summary | Category aggregation |
