describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	it("[Successful H-2] Home correct", () => {
		
		cy.login().then(({ token, user }) => {
			
			expect(token).to.exist;
			expect(user).to.exist;
			expect(user.name).to.exist;
	  
			
			cy.visit("/", {
			  failOnStatusCode: false,
			});
	  
			cy.get('h2').should('contain', 'Welcome JORGE,')
		  });
	})

	it("[Successful H-3] Get list clubs", () => {
		
		cy.login().then(({ token, user }) => {
			
			expect(token).to.exist;
			expect(user).to.exist;
			expect(user.name).to.exist;
	  
			
			cy.visit("/", {
			  failOnStatusCode: false,
			});
	  
			cy.get("#6566462b15980d613a6cdc9d").should("exist");

			cy.get('div').should('contain','Lakers');
		  });
	})

	it("[Successful H-4] Add club", () => {
		
		cy.login().then(({ token, user }) => {
			
			expect(token).to.exist;
			expect(user).to.exist;
			expect(user.name).to.exist;
	  
			
			cy.visit("/", {
			  failOnStatusCode: false,
			});
	  
			cy.contains('Add Club').click();

			cy.get('.text-h6').should('contain','Add club')

			cy.get('input[aria-label="Club name"]').type('Texto de ejemplo');

			cy.get('input[aria-label="Club description"]').type('Texto de ejemplo');

			cy.contains('button', 'Add Club').click();
		  });
	})

	it("[Error H-5] Add club without name", () => {
		
		cy.login().then(({ token, user }) => {
			
			expect(token).to.exist;
			expect(user).to.exist;
			expect(user.name).to.exist;
	  
			
			cy.visit("/", {
			  failOnStatusCode: false,
			});
	  
			cy.contains('Add Club').click();

			cy.get('.text-h6').should('contain','Add club')

			

			cy.get('input[aria-label="Club description"]').type('Texto de ejemplo');

			cy.contains('button', 'Add Club').click();

			cy.get('p').should('contain', 'name is required')
		  });
	})
});
