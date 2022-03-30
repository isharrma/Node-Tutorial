const products = [
  {
    id: "ptblue",
    description: "Blue Porsche Taycan",
    price: 70000,
    reviews: [],
  },
  {
    id: "jftorange",
    description: "Orange Jaguar F-type",
    price: 57000,
    reviews: [],
  },
  {
    id: "mcgrey",
    description: "Grey Mini Cooper Elctric S",
    price: 28000,
    reviews: [],
  },
];

function getAllProducts() {
  return products;
}

function getProductsByPrice(min, max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
}

function getProductByID(id) {
  return products.find((product) => {
    return product.id === id;
  });
}

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: [],
  };

  products.push(newProduct);
  return newProduct;
}

function addNewReview(id, rating, comment) {
  const matchedProduct = getProductByID(id);

  if (matchedProduct) {
    const newReview = {
      rating,
      comment,
    };

    matchedProduct.reviews.push(newReview);
    return newReview;
  }
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductByID,
  addNewProduct,
  addNewReview,
};
