import { test,expect } from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { ProductsPage } from "../pages/productPage";
import { HomePage } from "../pages/homePage";
import {ProductItem} from '../utils/objects/productItemObject';

test.describe('Products Tests',()=>{
    let homePage:HomePage;
    let productsPage:ProductsPage;
    let cartPage:CartPage;
    let productItemObject:ProductItem[]=[];

    test.beforeEach(async({page})=>{
        homePage=new HomePage(page);
        productsPage=new ProductsPage(page);
        cartPage=new CartPage(page);

        await homePage.navigateToHomePage();
        await homePage.verifyThatYouAreInHomePage();
    });

    test('add product to cart test',async({page})=>{
        test.info().annotations.push({type:'feature',description:'adding to cart'},
            {type:'description',description:'I select 3 product and check their name, price and quantity in the cart'}
        );
        await homePage.clickOnProductsBtn();
        await productsPage.verifyThatYouAreInProductsPage();
        for(let productNumer:number=0;productNumer<3;productNumer++){
            await productsPage.addProductToCart(productNumer);
            await productItemObject.push({
                productName:await productsPage.getProductName(productNumer),
                productPrice: await productsPage.getproductTotalPrices(productNumer)
            });
        }
        await homePage.clickOnCartBtn();
        await cartPage.verifyNumberOfProductsInCart(3);
        for(let productNumer:number=0;productNumer<3;productNumer++){
            let cartProductName = await cartPage.getProductNameInCart(productNumer);
            let productName = await productItemObject[productNumer].productName;
            expect(cartProductName).toBe(productName);    
            let cartProductPrice= await cartPage.getproductTotalPricesInCart(productNumer);
            let productPrice= await productItemObject[productNumer].productPrice;
            expect (cartProductPrice).toBe(productPrice);
        }
        
    });

});