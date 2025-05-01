import{Page,Locator, expect} from '@playwright/test'
import { BasePage } from './basePage'
import { HomePage } from './HomePage';

export class ProductsPage extends BasePage{
    readonly productCard:Locator;
    readonly productOverlay:Locator;
    readonly overlayAddToCartBtn:Locator;
    readonly homePage:HomePage;

    constructor(page:Page){
        super(page);
        this.homePage=new HomePage(page);
        this.productCard=page.locator('.product-image-wrapper');
        this.productOverlay=page.locator('.product-overlay');
        this.overlayAddToCartBtn=page.getByRole("link",{name:"Add to cart"});
        this.overlayAddToCartBtn=page.locator('.overlay-content .add-to-cart');
    }
    async verifyThatYouAreInProductsPage(){
        await expect(this.homePage.productsBtn).toHaveAttribute('style','color: orange;');
    }
    async addProductToCart(productOrder:number){
        const product=await this.locateElement(this.productCard,productOrder);
        await this.hoverOnElement(product);
        expect(await this.locateElement(this.productOverlay, productOrder)).toBeVisible();
        await this.clickOn(await this.locateElement(this.overlayAddToCartBtn,productOrder));

    }
}