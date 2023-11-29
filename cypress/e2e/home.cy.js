describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	it("[Successful H-2] Home correct", () => {
		// Llama al comando de login para obtener el token y establecer las credenciales
		cy.login().then(({ token, user }) => {
			// Verifica que el token se haya obtenido correctamente
			expect(token).to.exist;
			expect(user).to.exist;
			expect(user.name).to.exist;
	  
			// Visita la página de inicio de la aplicación
			cy.visit("/", {
			  failOnStatusCode: false,
			});
	  
			cy.get('h2').should('contain', 'Welcome JORGE,')
		  });
	})
});
