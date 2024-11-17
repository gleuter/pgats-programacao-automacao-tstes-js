class Cart{

    verificarSusbscribe_email(){
        cy.get('#susbscribe_email').scrollIntoView({ duration: 1000 });
        cy.get('.single-widget h2').invoke('text').then((testSubscription)=>{
            expect(testSubscription).to.be.equals("Subscription");
        })
        return this
    }


    selecinarCardDeVisuslizacao(){
        cy.contains('Add to cart').click()
        cy.contains('View Cart').click()
return this
}


}

export default new Cart()