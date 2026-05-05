import fs from 'fs';
import { products } from './src/data/products.js';

const values = products.map(p => 
  `('${p.name.replace(/'/g, "''")}', '${p.category}', ${p.price.toFixed(2)}, '${p.image}', '${(p.description || '').replace(/'/g, "''")}', ${p.isNew}, ${p.isTrending}, '${JSON.stringify(p.sizes || [])}')`
).join(',');

const sql = `INSERT INTO products (name, category, price, image, description, is_new, is_trending, sizes) VALUES ${values};`;
fs.writeFileSync('insert_products.sql', sql);
console.log('SQL generated.');
