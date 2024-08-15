/// <reference types="cypress" />

import {faker} from '@faker-js/faker'

//Triplo A - Arrange, Act e Assert

// Preparacao - Arrange

// Acao - Act

// Resultado esperado  Assert

describe("Automation Exercise", () => {
  beforeEach(() => {
    console.log("Automation Exercise");
  });

  it("Test Case 1: Register User", () => {
    const timestemp = new Date().getTime();
   
    const signup_name = "Tester Qa";

    cy.visit("https://automationexercise.com");

    // cy.url().should('include', 'https://automationexercise.com')
    // cy.url().should('eq', 'https://automationexercise.com/')

    cy.get("a[href$=login]").click();
    // cy.get('div[class ="signup-form"] h2').should('be', 'visible')

    cy.get('[data-qa="signup-name"]').type(signup_name);
    cy.get('[data-qa="signup-email"]').type(`tester-${timestemp}@mail.com`);
    cy.contains("button", "Signup").click();

    //radio checkbox
    // cy.get('#id_gender1').click()
    // cy.get('input[type=radio]').check('Mrs')
    // cy.get('input[type="radio"]').first().check()
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

    // cy.get('[data-qa="mobile_number"]').click()
    cy.contains("Create Account").click();

    cy.url().should("includes", "account_created");

    // https://automationexercise.com/account_created

    cy.get('[data-qa="account-created"]').should("be.visible");

    cy.get('[data-qa="continue-button"]').click();

    //cy.contains(`Logged in as ${signup_name}`)
    // cy.get('.navbar-nav a ').last().should('contain', `Logged in as ${signup_name}`)

    cy.get("i.fa-user").parent().should("contain", signup_name);

    cy.contains("Delete Account").click();
    cy.get('[data-qa="account-deleted"]').should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
  });

  it("Test Case 2: Login User with correct email and password", () => {
    const signup_name = "Tester Qa";

    cy.visit("https://automationexercise.com");
    cy.get("a[href$=login]").click();

    cy.get('[data-qa="login-email"]').type("tester-1723417210714@mail.com");
    cy.get('[data-qa="login-password"]').type("123456");
    cy.get('[data-qa="login-button"]').click();

    // cy.get('div[class ="signup-form"] h2').should('be', 'visible')
    cy.get("i.fa-user").parent().should("contain", signup_name);

    // cy.contains('Delete Account').click()
    // cy.get('[data-qa="account-deleted"]').should('be.visible')
    // cy.get('[data-qa="continue-button"]').click()
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    const signup_name = "Tester Qa";

    cy.visit("https://automationexercise.com");
    cy.get("a[href$=login]").click();

    cy.get('[data-qa="login-email"]').type("emailInvalido@gmail.com");
    cy.get('[data-qa="login-password"]').type("senhaInvalida");
    cy.get('[data-qa="login-button"]').click();

    cy.get(".login-form p").should(
      "contain",
      "Your email or password is incorrect!"
    );
  });

  it("Test Case 4: Logout User", () => {
    const signup_name = "Tester Qa";

    cy.visit("https://automationexercise.com");
    cy.get("a[href$=login]").click();

    cy.get('[data-qa="login-email"]').type("tester-1723417210714@mail.com");
    cy.get('[data-qa="login-password"]').type("123456");
    cy.get('[data-qa="login-button"]').click();

    cy.get("i.fa-user").parent().should("contain", signup_name);

    cy.contains(' Logout').click();

    cy.contains('Logged').should('not.exist');


  });

  it("Test Case 5: Register User with existing email", () => {
    const signup_name = "Tester Qa";

    cy.visit("https://automationexercise.com");
    cy.get("a[href$=login]").click();


    cy.get('[data-qa="signup-name"]').type(signup_name);
    cy.get('[data-qa="signup-email"]').type("tester-1723417210714@mail.com");
    cy.contains("button", "Signup").click();



    cy.get(".signup-form p").should(
        "contain",
        "Email Address already exist!"
      );

  });

  it('Test Case 6: Contact Us Form', () => {
    const signup_name = "Tester Qa";

    cy.visit("https://automationexercise.com");
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

    cy.visit("https://automationexercise.com");

    cy.get('a[href$=test_cases]').first().click()


    cy.url().should('contain',"https://automationexercise.com/test_cases")
    cy.get('.panel-group span').should('contain','Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:')

    
  })
  it('Test Case 8: Verify All Products and product detail page', () => {

    cy.visit("https://automationexercise.com");

    cy.get('a[href$=products]').first().click()


    cy.url().should('eq',"https://automationexercise.com/products")
    cy.get('.title').should('be.visible').and('contain','All Products')


    cy.get("a[href*='product_details']").should('have.length.greaterThan', 0);

    cy.get('.single-products')
    .should('be.visible')
    .and('have.length.at.least',1)
    .first()
    .parent()
    .contains('View Product')
    .click()

    // cy.get("a[href*='product_details']").eq(0).click()

    cy.url().should('include',"https://automationexercise.com/product_details")

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
   

    cy.visit("https://automationexercise.com");
    cy.get('a[href$=products]').first().click()

    cy.url().should('eq',"https://automationexercise.com/products")
    cy.get('.title').should('contain','All Products')

    cy.get('input[name="search"]').type(valorPesquisado,{ delay: 100 })

    cy.get('button[id="submit_search"]').click() 

    cy.get('.productinfo p').then(($produtos) => {
        let produtoEncontrado = false; // Flag para verificar se o produto foi encontrado
  
        // Itera sobre todos os produtos
        cy.wrap($produtos).each(($el) => {
          const textoProduto = $el.text().trim();
  
          // Verifica se o texto do produto corresponde ao valor pesquisado
          if (textoProduto === valorPesquisado) {
            produtoEncontrado = true; // Atualiza a flag
            cy.log(`Produto encontrado: ${textoProduto}`);
            return false; // Interrompe o loop
          }
        }).then(() => {
          // Faz a asserção após o loop
          expect(produtoEncontrado, `Produto '${valorPesquisado}' foi encontrado `).to.be.true;
        });
    
  })
})

  it('Test Case 10: Verify Subscription in home page', () => {

    cy.visit("https://automationexercise.com");
    cy.get('#susbscribe_email').scrollIntoView({ duration: 1000 });

    cy.get('#susbscribe_email').type('emailSubscriber@teste.com');
    cy.get('#subscribe').click();

    cy.contains('You have been successfully subscribed!')
    
  })


  it('Test Case 11: Verify Subscription in Cart page', () => {
    cy.visit("https://automationexercise.com");

    cy.contains('Cart').click();

    cy.get('#susbscribe_email').scrollIntoView({ duration: 1000 });

    cy.get('.single-widget h2').invoke('text').then((testSubscription)=>{
        expect(testSubscription).to.be.equals("Subscription");
    })

    cy.get('#susbscribe_email').type('emailSubscriber@teste.com');
    cy.get('#subscribe').click();

    cy.contains('You have been successfully subscribed!')
    
  })

  it('Test Case 12: Add Products in Cart', () => {

    cy.visit("https://automationexercise.com");

    cy.contains('Products').click();

    cy.get('div[class="single-products"] a').first().as('firstProduct');

    cy.get('@firstProduct').realHover();
    cy.wait(500);
    // cy.contains('Add to cart').click()

    // cy.get('.modal-footer > .btn').click();
    
  })

  it('Test Case 13: Verify Product quantity in Cart', () => {

    cy.visit("https://automationexercise.com");
    cy.url().should('eq', 'https://automationexercise.com/')

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


  it.only('Test Case 15: Place Order: Register before Checkout', () => {

    const timestemp = new Date().getTime();
    const signup_name = "Tester Qa";
    const anoAtual = new Date().getFullYear()

    cy.visit("https://automationexercise.com");

    // cy.url().should('include', 'https://automationexercise.com')
    // cy.url().should('eq', 'https://automationexercise.com/')

    cy.get("a[href$=login]").click();
    // cy.get('div[class ="signup-form"] h2').should('be', 'visible')

    cy.get('[data-qa="signup-name"]').type(signup_name);
    cy.get('[data-qa="signup-email"]').type(`tester-${timestemp}@mail.com`);
    cy.contains("button", "Signup").click();

    //radio checkbox
    // cy.get('#id_gender1').click()
    // cy.get('input[type=radio]').check('Mrs')
    // cy.get('input[type="radio"]').first().check()
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

    // cy.get('[data-qa="mobile_number"]').click()
    cy.contains("Create Account").click();

    cy.url().should("includes", "account_created");

    // https://automationexercise.com/account_created

    cy.get('[data-qa="account-created"]').should("be.visible");

    cy.get('[data-qa="continue-button"]').click();

    //cy.contains(`Logged in as ${signup_name}`)
    // cy.get('.navbar-nav a ').last().should('contain', `Logged in as ${signup_name}`)

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


    // cy.get('[data-qa="order-placed"] > b').should('be.visible').and('have.a.text','Congratulations! Your order has been confirmed!')
    
    
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