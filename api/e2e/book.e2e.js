const request = require('supertest');
const createApp = require('../src/app');
const { config } = require('../src/config');
const { MongoClient } = require('mongodb');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('Test for books', () => {
  let app = null;
  let server = null;
  let database = null;

  beforeAll( async ()=> {
    app = createApp();
    server = app.listen(3002);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll( async ()=> {
    await server.close();
    database.dropDatabase();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return the list books', async () => {
      // arrange
      const seedData = await database.collection('books').insertMany([
        {
        name:  'Book1',
        year: 1998,
        author: 'Nico',
      },
      {
        name:  'Book2',
        year: 1999,
        author: 'Nico',
      }
    ])
      // Act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({body})=> {
          console.log(body);
      // Assert
          expect(body.length).toEqual(seedData.insertedCount);
        })

    })
  });
});
