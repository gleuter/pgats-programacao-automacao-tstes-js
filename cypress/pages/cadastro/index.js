class Cadastro {

    preencherFormularioSignup(){
        const timestemp = new Date().getTime();
        const signup_name = "Tester Qa";

        Cypress.env('signup_name',signup_name)
        cy.get("a[href$=login]").click();
    
        cy.get('[data-qa="signup-name"]').type(Cypress.env('signup_name'));
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
    
        // /account_created
    
        cy.get('[data-qa="account-created"]').should("be.visible");
    
        cy.get('[data-qa="continue-button"]').click();
    }

 

    deletarUsusarioLogado(){
        cy.contains("Delete Account").click();
        cy.get('[data-qa="account-deleted"]').should("be.visible");
        cy.get('[data-qa="continue-button"]').click();
    }

}

export default new Cadastro();