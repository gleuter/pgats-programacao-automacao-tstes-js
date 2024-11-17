class Menu {

    menus= {
        PRODUTOS: 'Products',
        LOGIN: 'Login',
        LOGOUT: ' Logout',
        CONTACT_US: ' Contact us',
        HOME: 'Home',
        CART: 'Cart'

    }

    selecionaMenu(menu){
        cy.contains(menu).click();
        
    }



}

export default new Menu()