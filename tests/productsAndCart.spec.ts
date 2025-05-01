import { test,expect } from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { ProductsPage } from "../pages/productPage";
import { HomePage } from "../pages/homePage";

test.describe('Products Tests',()=>{
    let homePage:HomePage;
    let productsPage:ProductsPage;
    let cartPage:CartPage;

    test.beforeEach(async({page})=>{
        homePage=new HomePage(page);
        productsPage=new ProductsPage(page);
        cartPage=new CartPage(page);

        await homePage.navigateToHomePage();
        await homePage.verifyThatYouAreInHomePage();
    });

    test('add product to cart test',async({page})=>{
        await homePage.clickOnProductsBtn();
        await productsPage.verifyThatYouAreInProductsPage();
        for(let productNumer:number=0;productNumer<3;productNumer++){
            await productsPage.addProductToCart(productNumer);
        }
    });

});