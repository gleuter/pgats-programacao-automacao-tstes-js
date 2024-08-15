class Menu {

    menus= {
        PRODUTOS: 'Products',
        LOGIN: 'Login',
        LOGOUT: ' Logout'

    }

    selecionaMenu(menu){
        cy.contains(menu).click();
        
    }



}

export default new Menu()