const express = require('express');
const cors = require('cors');
const { isNil } = require('lodash');
const data = require('./data');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function applyFilters(products, { query, sort, colors, minPrice, maxPrice }) {
  const filteredProducts = [];

  for (const product of products) {
    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      continue;
    }

    if (colors && !colors.split(',').includes(product.color)) {
      continue;
    }

    if (!isNil(minPrice) && product.price / 100 < minPrice) {
      continue;
    }

    if (!isNil(maxPrice) && product.price / 100 > maxPrice) {
      continue;
    }

    filteredProducts.push(product);
  }

  return filteredProducts.sort((a, b) => {
    const { name, price } = a;
    const { name: nameB, price: priceB } = b;

    switch (sort) {
      case 'priceDesc':
        return priceB - price;
      case 'priceAsc':
        return price - priceB;
      default:
        return name.localeCompare(nameB);
    }
  });
}

app.get('/items', (req, res) => {
  // compute the max price for the filter
  const maxPrice = Math.round(
    Math.max(...data.map((product) => product.price)),
  );

  // fake the request to a backend search service like solr or elasticsearch
  setTimeout(() => {
    res.json({ products: applyFilters(data, req.query), maxPrice });
  }, 250);
});

app.listen(3001, () => {
  console.info('server listening on: 3001');
});
