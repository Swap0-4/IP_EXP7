
const express = require('express');
const app = express();
const path = require('path');
const { products } = require('./data'); // Make sure data.js exports products correctly

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">See Products</a>');
});

// Products list page
app.get('/api/products', (req, res) => {
  const productList = products
    .map((product) => `
      <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: Rs ${product.price}</p>
        <p><a href="/api/products/${product.id}">View Details</a></p>
      </div>`)
    .join('');

  res.send(`
    <h1>Product List</h1>
    ${productList}
    <p><a href="/">Go Back Home</a></p>
  `);
});

// Single product detail page
app.get('/api/products/:productID', (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find((product) => product.id === Number(productID));

  if (!singleProduct) {
    return res.status(404).send('<h1>Product Does Not Exist</h1><a href="/api/products">Go Back</a>');
  }

  res.send(`
    <div style="border: 1px solid #ddd; padding: 10px;">
      <h1>${singleProduct.name}</h1>
      <p>${singleProduct.description}</p>
      <p>Price: Rs ${singleProduct.price}</p>
      <p><a href="/api/products">Back to Products</a></p>
    </div>
  `);
});

// Starting the server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}....`);
});