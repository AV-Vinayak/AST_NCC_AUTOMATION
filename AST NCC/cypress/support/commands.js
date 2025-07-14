// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add('userlogin', (email, password) => {
//     //clear cookie and cache and session
//     cy.clearAllCookies()
//     Cypress.session.clearAllSavedSessions()
//     cy.session([email, password], () => {
//         cy.visit('/login');
//         cy.fixture('login/login.json').then((user)=>{
//             cy.get('[data-testid="emailId"]', { timeout: 30000 }).type(user.userDetails[0].username);
//             cy.get('[name="password"]', { timeout: 20000 }).type(user.userDetails[0].password);
//             cy.get('[type="submit"]', { timeout: 20000 }).click();
//         })

//         cy.wait(6000)
//         cacheAcrossSpecs: true
//     })
//     //cy.visit('/')
// })

Cypress.Commands.add('loginToCNC', (email, password) => {
    const baseUrl1 = Cypress.config('baseUrl1');
    const loginUrl = `${baseUrl1}/login`;
    cy.session([email, password, 'cnc'], () => {
        cy.visit(loginUrl);
        cy.fixture('login/login.json').then((user) => {
            cy.get('[data-testid="emailId"]').type(user.userDetails[0].username);
            cy.get('[name="password"]').type(user.userDetails[0].password);
            cy.get('[type="submit"]').click();
        });

        cy.wait(6000);
    }, {
        cacheAcrossSpecs: true
    });
});


Cypress.Commands.add('loginToGC', (email, password) => {
    const baseUrl2 = Cypress.config('baseUrl2');
    const loginUrl = `${baseUrl2}/login`;
    cy.clearAllCookies();
    Cypress.session.clearAllSavedSessions();

    cy.session([email, password, 'gc'], () => {
        cy.visit(loginUrl);
        cy.fixture('login/login.json').then((user) => {
            cy.get('[data-testid="emailId"]').type(user.userDetails[0].username);
            cy.get('[name="password"]').type(user.userDetails[0].password);
            cy.get('[type="submit"]').click();
        });

        cy.wait(6000);
    }, {
        cacheAcrossSpecs: true
    });
});


Cypress.Commands.add('userlogout', (win) => {
    //cy.visit('/')
    cy.wait(3000)
    cy.url().then(($url) => {
        if ($url.includes('http://18.212.216.28/')) {
            //cy.get('[href="/dashboard"]').contains("Dashboard").should('be.visible')         
            cy.get('[data-testid="KeyboardArrowDownIcon"]', { timeout: 30000 }).click()
            cy.get('.MuiPaper-root > .MuiList-root > .MuiButtonBase-root', { timeout: 30000 }).click()
            cy.get('.form-header > .MuiTypography-root').should('have.text', 'LOGIN')
        }
    })
})

Cypress.Commands.add('toastMessage', (message) => {
    cy.wait(1000)

    cy.get('.Toastify__toast-body', { timeout: 30000 }).invoke('text')
        .then((text) => {
            expect(text).to.equal(message);
        })

})
Cypress.Commands.add("clearThenType", {
    prevSubject: true
}, (subject, text) => {
    cy.wrap(subject).clear().type(text, {
        force: true
    });
});