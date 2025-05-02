import { BasePage } from "./basePage";
import { Page,Locator,expect } from "@playwright/test";

export class CartPage extends BasePage{
    readonly productRows:Locator;
    readonly productNames:Locator;
    readonly productQuantities:Locator;
    readonly productTotalPrices:Locator;
    readonly deleteProductButtons:Locator;

    constructor(page:Page){
        super(page);
        this.productRows=page.locator('tr[id^="product-"]');
        this.productNames=page.locator('.cart_description h4 a');
        this.productQuantities=page.locator('.cart_quantity button');
        this.productTotalPrices=page.locator('.cart_price p');
        this.deleteProductButtons=page.locator('.cart_quantity_delete');

    }
    async verifyNumberOfProductsInCart(expectedCount: number) {
        await expect(this.productRows).toHaveCount(expectedCount);
      }
    async getProductNameInCart(productOrderInCart:number){
       return (await this.locateElement(this.productNames,productOrderInCart)).textContent();
        
    }
    async getproductQuantitiesInCart(productOrderInCart:number){
        return (await this.locateElement(this.productQuantities,productOrderInCart)).textContent();
    }
    async getproductTotalPricesInCart(productOrderInCart:number){
        return (await this.locateElement(this.productTotalPrices,productOrderInCart)).textContent();
    }
    async clickOnDeleteBtn(productOrderInCart:number){
        await this.deleteProductButtons.nth(productOrderInCart).click();
    }
}