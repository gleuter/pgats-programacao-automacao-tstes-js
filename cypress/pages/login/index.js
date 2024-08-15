class LoginPage{

realizarLoginCompleto(emailUsuario,senha){
    cy.get('[data-qa="login-email"]').type(emailUsuario);
    cy.get('[data-qa="login-password"]').type(senha,{log:false});
    cy.get('[data-qa="login-button"]').click();
    return this 
}

realizarSigUpComUsuarioExistente(user,emailCadastrado){
  cy.get('[data-qa="signup-name"]').type(user);
  cy.get('[data-qa="signup-email"]').type(emailCadastrado);
  cy.contains("button", "Signup").click();
}


verificarSeUsuarioLogado(nomeUsuario) {
    cy.get('i.fa-user').parent().should('be.visible').should('contain', nomeUsuario);
    return this
  }

}

export default new LoginPage()