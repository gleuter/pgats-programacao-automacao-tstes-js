class Home{

scroolAteFimDaPagina(){
    cy.get('#susbscribe_email').scrollIntoView({ duration: 1000 });
    return this
}
   
preencherEmailSubscriber(emailSubscriber){
    cy.get('#susbscribe_email').type(emailSubscriber);
    cy.get('#subscribe').click();
    return this
}

verificarSeMEnsagemEApresentadas(mensagem){
    cy.contains(mensagem).should('be.visible')
return this

}


selecionarUltimoProduto(){
    cy.url().should('eq',`https://automationexercise.com/`)
    cy.get('a[href*="product_details"]').last().click();
    cy.url().should('contain', 'product_details')
    return this
}
   
}


export default new Home()