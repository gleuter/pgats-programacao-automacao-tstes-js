/// <reference types="cypress" />

import login from "../../pages/login";
import cadastro from "../../pages/cadastro";
import menu from "../../pages/menu";
import produtos from "../../pages/produtos";
import home from "../../pages/home";
import cart from "../../pages/cart";
import checkout from "../../pages/checkout";
import pagamento from "../../pages/pagamento";
//Triplo A - Arrange, Act e Assert

// Preparacao - Arrange

// Acao - Act

// Resultado esperado  Assert

//abigail-urbino@tuamaeaquelaursa.com 123456
// urso_fw5S9k
//uKk9oh2azyqLjjsLwk7G

// Doc https://www.browserstack.com/docs/automate/cypress

//La@12345678
// lambdatest-cypress run 

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
    const signup_name = "Tester Qa";
    Cypress.env("signup_name", signup_name);
  });

  it("Test Case 1: Register User", () => {
    cadastro.preencherFormularioSignup();
    login.verificarSeUsuarioLogado(Cypress.env("signup_name"));
    cadastro.deletarUsusarioLogado();
  });

  it("Test Case 2: Login User with correct email and password", () => {
    menu.selecionaMenu(menu.menus.LOGIN);
    login.realizarLoginCompleto("tester-1723417210714@mail.com", 123456);
    login.verificarSeUsuarioLogado(Cypress.env("signup_name"));
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    menu.selecionaMenu(menu.menus.LOGIN);
    login.realizarLoginCompleto("emailInvalido@gmail.com", "senhaInvalida");
    cy.get(".login-form p").should(
      "contain",
      "Your email or password is incorrect!"
    );
  });

  it("Test Case 4: Logout User", () => {
    menu.selecionaMenu(menu.menus.LOGIN);
    login.realizarLoginCompleto("tester-1723417210714@mail.com", "123456");
    login.verificarSeUsuarioLogado(Cypress.env("signup_name"));
    menu.selecionaMenu(menu.menus.LOGOUT);
    cy.contains("Logged").should("not.exist");
  });

  it("Test Case 5: Register User with existing email", () => {
    menu.selecionaMenu(menu.menus.LOGIN);
    login.realizarSigUpComUsuarioExistente(
      "Teste Login usuario existente",
      "tester-1723417210714@mail.com"
    );
    cy.get(".signup-form p").should("contain", "Email Address already exist!");
  });

  it("Test Case 6: Contact Us Form", () => {
    menu.selecionaMenu(menu.menus.CONTACT_US);
    cadastro.preecherDadosContactUs();
    cy.get(".status").should(
      "contain",
      "Success! Your details have been submitted successfully."
    );
    menu.selecionaMenu(menu.menus.HOME);
  });

  it("Test Case 7: Verify Test Cases Page", () => {
    cy.get("a[href$=test_cases]").first().click();
    cy.url().should("contain", "/test_cases");
    cy.get(".panel-group span").should(
      "contain",
      "Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:"
    );
  });
  it("Test Case 8: Verify All Products and product detail page", () => {
    menu.selecionaMenu(menu.menus.PRODUTOS);
    produtos
      .selecionarPrimeiroProduto()
      .varificarSeNomeProdutoNaovazio()
      .verificarSeAtributosDeProdutoSaoApresentados();
  });

  it("Test Case 9: Search Product", () => {
    const valorPesquisado = "Men Tshirt";
    produtos
      .buscarProdutoSelecinarPrimeiro(valorPesquisado)
      .verificarValorPesquisado(valorPesquisado);
  });

  it("Test Case 10: Verify Subscription in home page", () => {
    home
      .scroolAteFimDaPagina()
      .preencherEmailSubscriber("emailSubscriber@teste.com")
      .verificarSeMEnsagemEApresentadas(
        "You have been successfully subscribed!"
      );
  });

  it("Test Case 11: Verify Subscription in Cart page", () => {
    menu.selecionaMenu(menu.menus.CART);
    cart.verificarSusbscribe_email();
    home
      .preencherEmailSubscriber("emailSubscriber@teste.com")
      .verificarSeMEnsagemEApresentadas(
        "You have been successfully subscribed!"
      );
  });

  it("Test Case 13: Verify Product quantity in Cart", () => {
    home.selecionarUltimoProduto();
    produtos.selecionarQuantidade(4).verificarQuantidadeSelecionada("4");
  });

  it("Test Case 15: Place Order: Register before Checkout", () => {
    const timestemp = new Date().getTime();
    const anoAtual = new Date().getFullYear();

    cadastro.preencherFormularioSignup();
    cart.selecinarCardDeVisuslizacao();

    menu.selecionaMenu(menu.menus.CART);
    cy.url().should("includes", "view_cart");
    checkout
      .processarCheckOut()
      .verificarDetalhesDaOrdemDetalheEndereco("Address Details")
      .verificarDetalhesDaOrdemReview("Review Your Order")
      .adicionarComentarios("Teste adicionando Comentario")
      .clicarPlaceOrder()
      .preencherDadosDoCartao(anoAtual);
    pagamento.verificarItensDoPagamento();
    cadastro.deletarUsusarioLogado();
  });
});
