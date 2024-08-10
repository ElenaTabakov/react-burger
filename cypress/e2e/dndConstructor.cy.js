/* eslint-disable no-undef */
describe('Burger Constructor', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Should drag and drop ingredient with type bun into constructor', () => {

        cy.get('[data-test-id="ingredient-bun"]').first().as('bun');
        
        cy.get('@bun').trigger('dragstart');
        cy.get('@bun').find('h3').invoke("text").as("bunName");
        cy.get('[data-test="bun-top"]').trigger('drop');

        cy.get('[data-test="bun-top"]').within(() => {
            cy.get('@bunName').then((bunName) => {
                cy.contains(bunName); 
            });
        });
    });
    it('Should add two identical non-bun ingredients to the constructor as a list', () => {
        cy.get('[data-test-id^="ingredient-"]').not('[data-test-id="ingredient-bun"]').first().as('nonBunIngredient');
   
        cy.get('@nonBunIngredient').find('h3').invoke('text').as('ingredientName');
    
        cy.get('@nonBunIngredient').trigger('dragstart');
        cy.get('[data-test="other-ingredients"]').trigger('drop');
        cy.get('@nonBunIngredient').trigger('dragstart');
        cy.get('[data-test="other-ingredients"]').trigger('drop');

        cy.get('[data-test="other-ingredients"]').within(() => {
            cy.get('li').should('have.length', 2); 
            cy.get('li').each(($li) => {
                cy.get('@ingredientName').then((ingredientName) => {
                    cy.wrap($li).contains(ingredientName); 
                });
            });
        });
    });


});

