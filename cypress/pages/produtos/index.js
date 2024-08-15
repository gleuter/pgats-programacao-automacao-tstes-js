class Produto{


    selecionarPrimeiroProduto(){
        cy.get('.title').should('be.visible').and('contain','All Products')
        cy.get("a[href*='product_details']").should('have.length.greaterThan', 0);
        cy.get('.single-products')
        .should('be.visible')
        .and('have.length.at.least',1)
        .first()
        .parent()
        .contains('View Product')
        .click()
        return this
    }

    varificarSeNomeProdutoNaovazio(){
        cy.url().should('include',"/product_details")

        cy.get('.product-information > h2').should('be.visible').invoke('text').then((nomeProduto)=>{
            const textoLimpo = nomeProduto.trim();
            expect(textoLimpo).to.not.be.empty;
        })

        return this
    }

    verificarSeAtributosDeProdutoSaoApresentados(){
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
    return  this
    }

    buscarProdutoSelecinarPrimeiro(valorPesquisado){
        cy.get('a[href$=products]').first().click()
        cy.url().should('eq',`https://automationexercise.com/products`)
        cy.get('.title').should('contain','All Products')
        cy.get('input[name="search"]').type(valorPesquisado,{ delay: 100 })
        cy.get('button[id="submit_search"]').click() 
        return this
    }


    verificarValorPesquisado(valorPesquisado){ 
        cy.get('.productinfo p').then(($produtos) => {
            let produtoEncontrado = false; 
            cy.wrap($produtos).each(($el) => {
              const textoProduto = $el.text().trim()
              if (textoProduto === valorPesquisado) {
                produtoEncontrado = true; 
                cy.log(`Produto encontrado: ${textoProduto}`);
                return false
              }
            }).then(() => {
              expect(produtoEncontrado, `Produto '${valorPesquisado}' foi encontrado `).to.be.true;
            });
   
        })
        return this
}

selecionarQuantidade(quantidade){
    cy.get('#quantity').clear().type(quantidade)
    cy.get('#quantity').should('have.value', quantidade);
    cy.get('.cart').click()
    cy.get('u').click()
    return this
}


verificarQuantidadeSelecionada(quantidadeSelecionada){
    cy.get('td.cart_quantity')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.equal(quantidadeSelecionada);
    })
    return this
}

}
export default new Produto()