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

	it("[SUCCESS C-3] add member", () => {
		cy.login().then(({ token, user }) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				var originalNumber = 0;
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
				cy.get('.text-h6').invoke('text').then((originalText) => {
					originalNumber = parseInt(originalText.match(/\d+/)[0]);
				}),
				cy.contains('New member').click();
				cy.get('[name="member-name"]').type('Nombre ejemplo');
				cy.get('[name="member-lastname"]').type('Apellido ejemplo');
				cy.get('[name="member-email"]').type('brevis@ejemplo.com');
				cy.get('[name="member-dni"]').type('DNI ejemplo');
				cy.get('[name="member-nickname"]').type('Nickname ejemplo');
				cy.contains('span[class="block"]', 'Add Member').click();
				cy.get('.text-h6').invoke('text').then((newText) => {
					const newNumber = parseInt(newText.match(/\d+/)[0]);				
					expect(newNumber).to.eq(originalNumber + 1);
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
				var originalNumber = 0;
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
});
