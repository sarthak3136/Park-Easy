const mongoose = require('mongoose');
const Feedback = require('../../models/Feedback');

describe('Feedback Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://parkeasy123:parkeasy123@userparkeasy.olqblp4.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(Feedback).toBeDefined();
  });

  it('should have required fields', async () => {
    const feedback = new Feedback({
      name: 'Bruce Wayne',
      comment: 'Great feedback!',
      stars: 5,
      postId: '123',
    });

    const validationError = feedback.validateSync();
    expect(validationError).toBeUndefined();
  });

  it('should not validate if required fields are missing', async () => {
    const feedback = new Feedback({});

    const validationError = feedback.validateSync();
    expect(validationError).toBeUndefined();
  });

  it('should have correct data types', async () => {
    const feedback = new Feedback({
      name: 'Bruce Wayne',
      comment: 'Great feedback!',
      stars: '5',
      postId: '123',
    });

    const validationError = feedback.validateSync();
    expect(validationError).toBeUndefined();
  });
});
