import{Page,Locator, expect} from '@playwright/test'
import { BasePage } from './basePage'
import { HomePage } from './HomePage';

export class ProductsPage extends BasePage{
    readonly productCard:Locator;
    readonly productOverlay:Locator;
    readonly overlayAddToCartBtn:Locator;
    readonly productAddedMessage:Locator;
    readonly continueShoppingBtn:Locator;
    readonly productNames:Locator;
    readonly productTotalPrices:Locator;
    readonly homePage:HomePage;

    constructor(page:Page){
        super(page);
        this.homePage=new HomePage(page);
        this.productCard=page.locator('.product-image-wrapper');
        this.productOverlay=page.locator('.product-overlay');
        this.overlayAddToCartBtn=page.getByRole("link",{name:"Add to cart"});
        this.overlayAddToCartBtn=page.locator('.overlay-content .add-to-cart');
        this.productAddedMessage=page.locator('.modal-title.w-100');
        this.continueShoppingBtn=page.getByRole('button',{name:"Continue Shopping"});
        this.productNames=page.locator('.productinfo.text-center p');
        this.productTotalPrices=page.locator('.productinfo.text-center h2');
    }
    async verifyThatYouAreInProductsPage(){
        await expect(this.homePage.productsBtn).toHaveAttribute('style','color: orange;');
    }
    async verifyThatProductIsAdded(){
        await expect(this.productAddedMessage).toHaveText("Added!");
    }
    async clickOnContinueShoppingBtn(){
        await this.clickOn(this.continueShoppingBtn);
    }
    async getProductName(productOrder:number){
        return (await this.locateElement(this.productNames,productOrder)).textContent();
    }
    async getproductTotalPrices(productOrder:number){
        return (await this.locateElement(this.productTotalPrices,productOrder)).textContent();
    }
    async addProductToCart(productOrder:number){
        const product=await this.locateElement(this.productCard,productOrder);
        await this.hoverOnElement(product);
        expect(await this.locateElement(this.productOverlay, productOrder)).toBeVisible();
        await this.clickOn(await this.locateElement(this.overlayAddToCartBtn,productOrder));
        await this.verifyThatProductIsAdded();
        await this.clickOnContinueShoppingBtn();
    }
}