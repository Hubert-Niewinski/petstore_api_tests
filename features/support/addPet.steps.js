import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';
import { petSchema } from './schemas.js';

chai.use(chaiJsonSchema);

const { expect } = chai;
const BASE_URL = process.env.BASE_URL || 'https://petstore.swagger.io/v2';
const PATH = '/pet';

let pet = {
  id: 0,
  category: {
    id: 0,
    name: 'dog',
  },
  name: 'Bob',
  photoUrls: [''],
  tags: [],
  status: 'available',
};

let invalidPet;
let response;

Given('I have a pet to create with category {string} and name {string}', async (categoryName, petName) => {
  pet = {
    ...pet,
    category: {
      id: 0,
      name: categoryName,
    },
    name: petName,
  };
});

When('I create the pet', async () => {
  response = await axios.post(`${BASE_URL}${PATH}`, pet);
});

Then('I receive confirmation that the pet was created', () => {
  expect(response.status).to.equal(200);
});

Then('pet category is {string}', async categoryName => {
  expect(response.data.category.name).to.equal(categoryName);
});

Then('pet name is {string}', async petName => {
  expect(response.data.name).to.equal(petName);
});

Then("The the pet's data was correctly saved", async () => {
  expect(response.data).to.be.jsonSchema(petSchema);
});

Given('I do not have the required data to create a new pet', () => {
  invalidPet = [];
});

Given('I do not have the correct data to create a new pet, status is invalid', () => {
  invalidPet = { ...pet, status: 0 };
});

Given('I do not have the correct data to create a new pet, categoryId is invalid', () => {
  invalidPet = { ...pet, category: { id: 'id passed as string', name: 'turtle' } };
});

When('I try to create the pet', async () => {
  try {
    (response = await axios.post(`${BASE_URL}${PATH}`)), invalidPet;
  } catch (error) {
    response = error.response;
  }
});

When('I try to create a pet with dangerous property {string}', async dangerousProperty => {
  try {
    response = await axios.post(`${BASE_URL}${PATH}`, {
      ...pet,
      dangerousProperty,
    });
  } catch (error) {
    response = error.response;
  }
});

Then('I receive the information that pet has not been created', () => {
  expect(response.status).not.to.be.oneOf([200, 201]);
});

Then('Dangerous property has not been saved to the database', async () => {
  expect(response.data.dangerousProperty).to.be.undefined;
});
