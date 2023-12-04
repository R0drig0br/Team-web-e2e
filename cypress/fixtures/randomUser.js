const { faker } = require('@faker-js/faker');

module.exports = {
	firstName:faker.name.firstName(),
  lastName:faker.name.lastName(),
  email: faker.internet.email(),
  dni: faker.datatype.number({ min: 10000000, max: 99999999 }).toString(),
  nickname: faker.internet.userName()
  
	
  }