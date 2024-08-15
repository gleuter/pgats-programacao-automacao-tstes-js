class LoginPage{

realizarLoginCompleto(emailUsuario,senha){
    cy.get('[data-qa="login-email"]').type(emailUsuario);
    cy.get('[data-qa="login-password"]').type(senha,{login:false});
    cy.get('[data-qa="login-button"]').click();
    return this 
}

verificarSeUsuarioLogado(nomeUsuario) {
    cy.get('i.fa-user').parent().should('be.visible').should('contain', nomeUsuario);
    return this
  }

}

export default new LoginPage()