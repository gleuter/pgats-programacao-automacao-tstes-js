import {faker} from '@faker-js/faker'

class Checkout{

    processarCheckOut() {
        cy.get('a[class$="check_out"]').click();
        return this;
      }


      verificarDetalhesDaOrdemDetalheEndereco(msgParaVerificar){
        cy.get('.heading').first().should('have.text', msgParaVerificar)
        return this
      }

      verificarDetalhesDaOrdemReview(msgParaVerificar){
        cy.get('.heading').last().should('have.text', msgParaVerificar)
        return this
      }

      adicionarComentarios(comentario){
        cy.get('.form-control').type(comentario)
        return this 
      }

      clicarPlaceOrder(){
        cy.get('.btn-default.check_out').click()
        return this
      }

      preencherDadosDoCartao(anoAtual){
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(faker.date.month());
        cy.get('[data-qa="expiry-year"]').type(anoAtual + 7)
        cy.get('[data-qa="pay-button"]').click()
        return this
      }



}

export default new Checkout()