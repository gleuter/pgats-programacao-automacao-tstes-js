/// <reference types="cypress" />
import {faker} from '@faker-js/faker'

import login from '../../pages/login'
import cadastro from '../../pages/cadastro';
import menu from '../../pages/menu'
//Triplo A - Arrange, Act e Assert

// Preparacao - Arrange

// Acao - Act

// Resultado esperado  Assert


//abigail-urbino@tuamaeaquelaursa.com 123456
// urso_fw5S9k 
//uKk9oh2azyqLjjsLwk7G

// Doc https://www.browserstack.com/docs/automate/cypress


//La@12345678

// lambdatest-cypress run --cy="--config-file ./cypress.config.js"


describe("Automation Exercise", () => {
 
  beforeEach(() => {
    cy.visit('/');
    const signup_name = "Tester Qa";
    Cypress.env('signup_name',signup_name)
  });

  it("Test Case 1: Register User", () => {
    cadastro.preencherFormularioSignup()
    login.verificarSeUsuarioLogado(Cypress.env('signup_name'))
    cadastro.deletarUsusarioLogado()
  });

  it("Test Case 2: Login User with correct email and password", () => {
    menu.selecionaMenu(menu.menus.LOGIN)
    login.realizarLoginCompleto("tester-1723417210714@mail.com",123456)
    login.verificarSeUsuarioLogado(Cypress.env('signup_name'))
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    menu.selecionaMenu(menu.menus.LOGIN)
    login.realizarLoginCompleto("emailInvalido@gmail.com","senhaInvalida")
    cy.get(".login-form p").should(
      "contain",
      "Your email or password is incorrect!"
    );
  });

  it("Test Case 4: Logout User", () => {
  menu.selecionaMenu(menu.menus.LOGIN)
  login.realizarLoginCompleto("tester-1723417210714@mail.com","123456")
  login.verificarSeUsuarioLogado(Cypress.env('signup_name'))
  menu.selecionaMenu(menu.menus.LOGOUT)
  cy.contains('Logged').should('not.exist');
  });

  it("Test Case 5: Register User with existing email", () => {
    menu.selecionaMenu(menu.menus.LOGIN)
    login.realizarSigUpComUsuarioExistente("Teste Login usuario existente","tester-1723417210714@mail.com")
    cy.get(".signup-form p").should(
        "contain",
        "Email Address already exist!"
      );
  });

  it.only('Test Case 6: Contact Us Form', () => {
    const signup_name = "Tester Qa";

  
    cy.get('a[href$=us]').click();

    cy.get('div.contact-form > .title').should('be.visible')
    cy.get('[data-qa="name"]').type(signup_name)
    cy.get('[data-qa="email"]').type("tester-1723417210714@mail.com")
    cy.get('[data-qa="subject"]').type('Subject test ')
    cy.get('[data-qa="message"]').type('Message test ')

    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/example.json')
    cy.get('[data-qa="submit-button"]').click()


    cy.get('.status').should(  "contain","Success! Your details have been submitted successfully.")

    cy.contains('Home').click();



  })

  it('Test Case 7: Verify Test Cases Page', () => {


    cy.get('a[href$=test_cases]').first().click()


    cy.url().should('contain',"/test_cases")
    cy.get('.panel-group span').should('contain','Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:')

    
  })
  it('Test Case 8: Verify All Products and product detail page', () => {

  

    cy.get('a[href$=products]').first().click()

    cy.url().should('eq',`https://automationexercise.com/products`)

    cy.get('.title').should('be.visible').and('contain','All Products')


    cy.get("a[href*='product_details']").should('have.length.greaterThan', 0);

    cy.get('.single-products')
    .should('be.visible')
    .and('have.length.at.least',1)
    .first()
    .parent()
    .contains('View Product')
    .click()


    cy.url().should('include',"/product_details")

    cy.get('.product-information > h2').should('be.visible').invoke('text').then((nomeProduto)=>{
        const textoLimpo = nomeProduto.trim();
        expect(textoLimpo).to.not.be.empty;
    });

    cy.get('.product-information p').eq(0).should('contain','Category:')

    cy.get('.product-information span').eq(1).should('contain','Rs.')

    cy.get('.product-information span span').should('be.visible').invoke('text').then((valorProduto) => {
        const regex = /^Rs. \d+$/
        expect(valorProduto.trim()).to.match(regex);
    })

    cy.get('.product-information p').eq(1).should('contain','Availability:').invoke('text').then((category) => { 
        expect(category).to.not.be.empty;
    })

    cy.get('.product-information p').eq(2).should('contain','Condition:').invoke('text').then((condition) => { 
        expect(condition).to.not.be.empty;
    })

    cy.get('.product-information p').eq(3).should('contain','Brand:').invoke('text').then((brand) => { 
        expect(brand).to.not.be.empty;
    })

  })

  it('Test Case 9: Search Product', () => {

    const valorPesquisado = 'Men Tshirt'
   
   
    cy.get('a[href$=products]').first().click()

    cy.url().should('eq',`https://automationexercise.com/products`)

    cy.get('.title').should('contain','All Products')

    cy.get('input[name="search"]').type(valorPesquisado,{ delay: 100 })

    cy.get('button[id="submit_search"]').click() 

    cy.get('.productinfo p').then(($produtos) => {
        let produtoEncontrado = false; 
  
        cy.wrap($produtos).each(($el) => {
          const textoProduto = $el.text().trim();
  
          if (textoProduto === valorPesquisado) {
            produtoEncontrado = true; // Atualiza a flag
            cy.log(`Produto encontrado: ${textoProduto}`);
            return false; // Interrompe o loop
          }
        }).then(() => {
          expect(produtoEncontrado, `Produto '${valorPesquisado}' foi encontrado `).to.be.true;
        });
    
  })
})

  it('Test Case 10: Verify Subscription in home page', () => {

    cy.get('#susbscribe_email').scrollIntoView({ duration: 1000 });

    cy.get('#susbscribe_email').type('emailSubscriber@teste.com');
    cy.get('#subscribe').click();

    cy.contains('You have been successfully subscribed!')
    
  })


  it('Test Case 11: Verify Subscription in Cart page', () => {

    cy.contains('Cart').click();

    cy.get('#susbscribe_email').scrollIntoView({ duration: 1000 });

    cy.get('.single-widget h2').invoke('text').then((testSubscription)=>{
        expect(testSubscription).to.be.equals("Subscription");
    })

    cy.get('#susbscribe_email').type('emailSubscriber@teste.com');
    cy.get('#subscribe').click();

    cy.contains('You have been successfully subscribed!')
    
  })


  it('Test Case 13: Verify Product quantity in Cart', () => {

    cy.url().should('eq',`https://automationexercise.com/`)

    cy.get('a[href*="product_details"]').last().click();
    cy.url().should('contain', 'product_details')
    cy.get('#quantity').clear().type(4)

    cy.get('#quantity').should('have.value', '4');
    cy.get('.cart').click()

    cy.get('u').click()

    cy.get('td.cart_quantity')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.equal('4');
    });


    
  })


  it('Test Case 15: Place Order: Register before Checkout', () => {

    const timestemp = new Date().getTime();
    const signup_name = "Tester Qa";
    const anoAtual = new Date().getFullYear()
   
    cy.url().should('eq',`https://automationexercise.com/`)


    cy.get("a[href$=login]").click();
   
    cy.get('[data-qa="signup-name"]').type(signup_name);
    cy.get('[data-qa="signup-email"]').type(`tester-${timestemp}@mail.com`);
    cy.contains("button", "Signup").click();


    cy.get('input[type="radio"]').eq(0).click();
    cy.get("[type=password]").type("123456", { log: false });

    cy.get("[data-qa=days]").select("31").should("have.value", "31");
    cy.get("[data-qa=days]").select(31).should("have.value", "31");

    cy.get("#months").select("December").should("have.value", "12");
    cy.get("[name=years]").select("1900").should("have.value", "1900");

    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();

    cy.get('[data-qa="first_name"]').type("Elon");
    cy.get('[data-qa="last_name"]').type("Musk");
    cy.get('[data-qa="company"]').type("Space X");

    cy.get('[data-qa="address"]').type("Rua endereco , 1234");

    cy.get('[data-qa="country"]')
      .select("Israel")
      .should("have.value", "Israel");

    cy.get('[data-qa="state"]').type("Los Angeles");
    cy.get('[data-qa="city"]').type("cabo canaveral");
    cy.get('[data-qa="zipcode"]').type("38412388");

    cy.get('[data-qa="mobile_number"]').type("34999998258");

    cy.contains("Create Account").click();

    cy.url().should("includes", "account_created");

    cy.get('[data-qa="account-created"]').should("be.visible");

    cy.get('[data-qa="continue-button"]').click();

    cy.get("i.fa-user").parent().should("contain", signup_name);

    cy.contains('Add to cart').click()
    cy.contains('View Cart').click()


    cy.contains('Cart').click()
    cy.url().should('includes','view_cart')

    cy.get('a[class$="check_out"]').click()

    cy.get('.heading').first().should('have.text', 'Address Details')
    cy.get('.heading').last().should('have.text', 'Review Your Order')

    cy.get('.form-control').type('34 99999-9999')


    cy.get('.btn-default.check_out').click()


    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
    cy.get('[data-qa="expiry-month"]').type(faker.date.month());

    cy.get('[data-qa="expiry-year"]').type(anoAtual + 7)


    cy.get('[data-qa="pay-button"]').click()

       cy.get('[data-qa="order-placed"] > b').should('be.visible').and('have.a.text','Order Placed!')
    
       cy.get('.col-sm-9.col-sm-offset-1').within(() => {
        cy.contains('h2', 'Order Placed!').should('be.visible');
        cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');
        cy.contains('a', 'Download Invoice').should('have.attr', 'href', '/download_invoice/500');
        cy.contains('a', 'Continue').should('have.attr', 'href', '/');
      });


    cy.contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]').should("be.visible");
    cy.get('[data-qa="continue-button"]').click();

  })

})