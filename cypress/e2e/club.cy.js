describe("Club", () => {
	it("[SUCCESS C-1] club details", () => {
		cy.login().then(({ token, user }) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
			});
		});
	});

	it("[Error C-2] club without using token", () => {
		cy.visit('/club', {
			failOnStatusCode: false,
		});
		cy.url().should('eq', `${Cypress.config().baseUrl}/login`)
	});

	it("[SUCCESS C-3] add member", () => {
		const randomUser = require('../fixtures/randomUser');
		cy.login().then(({ token, user }) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});

				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
				cy.wait(3000);
				cy.get('.text-h6').invoke('text').then((originalText) => {
					const originalNumber = parseInt(originalText.match(/\d+/)[0]);
					cy.contains('New member').click();
					cy.get('[name="member-name"]').type(randomUser.firstName);
					cy.get('[name="member-lastname"]').type(randomUser.lastName);
					cy.get('[name="member-email"]').type(randomUser.email);
					cy.get('[name="member-dni"]').type(randomUser.dni);
					cy.get('[name="member-nickname"]').type(randomUser.nickname);
					cy.contains('span[class="block"]', 'Add Member').click();
					cy.wait(3000);
					cy.get('.text-h6').invoke('text').then((newText) => {
						const newNumber = parseInt(newText.match(/\d+/)[0]);				
						expect(newNumber).to.eq(originalNumber + 1);
				});
					
				});
				
			});
		});
	});

	it("[Error C-4] add member without email", () => {
		cy.login().then(({ token, user }) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
				cy.contains('New member').click();
				cy.get('[name="member-name"]').type('Nombre ejemplo');
				cy.get('[name="member-lastname"]').type('Apellido ejemplo');
				cy.get('[name="member-dni"]').type('DNI ejemplo');
				cy.get('[name="member-nickname"]').type('Nickname ejemplo');
				cy.contains('span[class="block"]', 'Add Member').click();
				cy.get('p').should('contain', 'email is required and must be a valid email');
			});
		});
	});

	it("[Error C-5] delete member from club", () => {
		cy.login().then(({ token, user }) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[1]._id}]`).click();
				cy.contains('i', 'delete_forever').click();
				cy.get('div').should('contain', 'Unavailable');
			});
		});
	});
});
