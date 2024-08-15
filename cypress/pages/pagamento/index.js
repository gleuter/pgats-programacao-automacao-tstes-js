class Pagamento{

    verificarItensDoPagamento(){
        cy.get('[data-qa="order-placed"] > b').should('be.visible').and('have.a.text','Order Placed!')
    
        cy.get('.col-sm-9.col-sm-offset-1').within(() => {
         cy.contains('h2', 'Order Placed!').should('be.visible');
         cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');
         cy.contains('a', 'Download Invoice').should('have.attr', 'href', '/download_invoice/500');
         cy.contains('a', 'Continue').should('have.attr', 'href', '/');
       });
    }

}

export default new Pagamento();