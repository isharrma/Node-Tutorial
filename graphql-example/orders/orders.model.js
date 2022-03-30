const orders = [
  {
    date: "2027-June-24",
    subtotal: 57000,
    items: [
      {
        product: {
          id: "jftorange",
          description: "Orange Jaguar F-Type",
        },
        quantity: 1,
      },
    ],
  },
];

function getAllOrders() {
  return orders;
}

module.exports = {
  getAllOrders,
};
