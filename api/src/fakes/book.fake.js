const { faker } = require ('@faker-js/faker');

const getSingleBook = () => ({
    _id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });

  const getManyBook = (size) => {
    const limit = size ?? 10; // Si no me envian el tamaño genero 10 libros.
    const fakeBooks = []; // Colocando los fakeBooks generados.
    for (let index = 0; index < limit; index += 1) {
      fakeBooks.push(getSingleBook());
    }
    return [...fakeBooks];
  };

module.exports = { getSingleBook, getManyBook };
