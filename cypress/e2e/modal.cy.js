/* eslint-disable no-undef */
describe('Modal window',() =>{
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Should open ingredient card in modal window', () => {
        cy.get('[data-test-id^="ingredient-"]').first().as('ingredient');

        cy.get('@ingredient').find('h3').invoke('text').as('ingredientName');
       
        cy.get('@ingredient').click();

        cy.get('[data-test="modal"]').within(() => {
            cy.get('@ingredientName').then((ingredientName) => {
                cy.contains(ingredientName); 
            });
        });
    });
    it('Should close modal window by pressing Esc', () => {
        cy.get('[data-test-id^="ingredient-"]').first().click();

        cy.get('body').type('{esc}');

        cy.get('[data-test="modal"]').should('not.exist');
    });

    it('Should close modal window by clicking the close button', () => {
        cy.get('[data-test-id^="ingredient-"]').first().click();

        cy.get('[data-test="modal"] button').click();

        cy.get('[data-test="modal"]').should('not.exist');
    });

    it('Should close modal window by clicking the overlay', () => {
        cy.get('[data-test-id^="ingredient-"]').first().click();
    
        cy.get('[data-test="modal-overlay"]').click({ force: true });

        cy.get('[data-test="modal"]').should('not.exist');
    });
})
