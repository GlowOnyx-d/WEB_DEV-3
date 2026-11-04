require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Study Table',
    sku: 'FURN-TB-812',
    category: 'Furniture',
    price: 3999,
    quantity: 2,
    reorderLevel: 4,
    supplier: 'IKEA India'
  },
  {
    name: 'Office Chair',
    sku: 'FURN-CH-101',
    category: 'Furniture',
    price: 5499,
    quantity: 15,
    reorderLevel: 5,
    supplier: 'Godrej Interio'
  },
  {
    name: 'Smartphone',
    sku: 'ELEC-SP-201',
    category: 'Electronics',
    price: 15999,
    quantity: 20,
    reorderLevel: 5,
    supplier: 'Samsung'
  },
  {
    name: 'Bluetooth Speaker',
    sku: 'ELEC-BS-202',
    category: 'Electronics',
    price: 2499,
    quantity: 30,
    reorderLevel: 10,
    supplier: 'boAt'
  },
  {
    name: 'Wireless Mouse',
    sku: 'ELEC-MS-203',
    category: 'Electronics',
    price: 799,
    quantity: 8,
    reorderLevel: 10,
    supplier: 'Logitech'
  },
  {
    name: 'Laptop Stand',
    sku: 'ELEC-LS-204',
    category: 'Electronics',
    price: 1299,
    quantity: 38,
    reorderLevel: 10,
    supplier: 'Portronics'
  },
  {
    name: 'Cotton T-Shirt',
    sku: 'APRL-TS-301',
    category: 'Apparel',
    price: 499,
    quantity: 50,
    reorderLevel: 15,
    supplier: 'Allen Solly'
  },
  {
    name: 'Denim Jeans',
    sku: 'APRL-JN-302',
    category: 'Apparel',
    price: 2299,
    quantity: 28,
    reorderLevel: 10,
    supplier: 'Levis'
  },
  {
    name: 'Gel Pen Pack of 15',
    sku: 'STNY-PN-713',
    category: 'Stationery',
    price: 120,
    quantity: 40,
    reorderLevel: 20,
    supplier: 'Cello Pens'
  },
  {
    name: 'A4 Notebook',
    sku: 'STNY-NB-714',
    category: 'Stationery',
    price: 60,
    quantity: 5,
    reorderLevel: 25,
    supplier: 'Classmate'
  },
  {
    name: 'Basmati Rice 5kg',
    sku: 'GROC-RC-401',
    category: 'Groceries',
    price: 650,
    quantity: 60,
    reorderLevel: 20,
    supplier: 'India Gate'
  },
  {
    name: 'Olive Oil 1L',
    sku: 'GROC-OL-402',
    category: 'Groceries',
    price: 899,
    quantity: 6,
    reorderLevel: 10,
    supplier: 'Figaro'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Deleted existing products');

    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products successfully`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore
    }
    process.exit(1);
  }
}

seedDatabase();

