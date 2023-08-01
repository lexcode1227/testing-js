const { getManyBook } = require('../fakes/book.fake');
const BooksService = require('./books.service');
// Data de relleno preparada.
// Esta responsabilidad pasa a la librería fakejs.dev y se llama en el test unitario.
/*
const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter 2',
  },
];
*/
// Para hacer pruebas de comportamiento se usa jest.fn().
// se cambia el nombre de spy a Mock para que el jest lo interprete bien.
const mockGetAll = jest.fn();

// Suplantación de la BD.
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  // Metodos a suplantar.
  getAll: mockGetAll, // Directo, sin fake y sin => function.
  // getAll: () => [...fakeBooks], // "data enlatada"
  create: () => {},
})));

describe('Test for BooksService', () => {
  let service;
  beforeEach(() => {
    service = new BooksService();
    // Limpiar los Mocks antes de cada caso para no dejar relleno del anterior.
    jest.clearAllMocks();
  });

  describe('test for getBooks', () => {
    test('should return a list book', async () => {
      // Arrange
      const fakeBooks = getManyBook(10);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
      // Espiando
      expect(mockGetAll).toHaveBeenCalled(); // Para saber si fué llamado
      expect(mockGetAll).toHaveBeenCalledTimes(1); // cuantas veces es llamado
      expect(mockGetAll).toHaveBeenCalledWith('books', {}); // Con qué argumentos fué llamado.
    });

    test('should return a list book', async () => {
      // Arrange
      const fakeBooks = getManyBook(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks();
      console.log(books);
      // Assert
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});
