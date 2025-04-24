import{Page,Locator, expect} from '@playwright/test'
import { BasePage } from './basePage'
import { link } from 'fs';

export class HomePage extends BasePage{
 
    readonly loginBtn:Locator;
    readonly productsBtn: Locator;
    readonly cartBtn: Locator;
    readonly homePageBtn: Locator;
    readonly deleteAccountBtn: Locator;

    constructor(page:Page){
        super(page);
        this.loginBtn= page.getByRole('link',{name:" Signup / Login"});
        this.productsBtn= page.getByRole('link',{name:" Products"});
        this.cartBtn= page.getByRole('link',{name:" Cart"});
        this.homePageBtn= page.getByRole('link',{name:" Home"});
        this.deleteAccountBtn= page.getByRole('link',{name:"  Delete Account"});
    }

    async navigateToHomePage(){
        try{
            await this.navigateToPage('https://automationexercise.com/');
        }catch{
            await this.reload();
        }
        await this.waitForNetworkIdel();
    }
    async clickOnLoginBtn(){
        await this.clickOn(this.loginBtn);
        await this.waitForNetworkIdel();
    }
    async clickOnProductsBtn(){
        await this.clickOn(this.productsBtn);
    }
    async clickOnCartBtn(){
        await this.clickOn(this.cartBtn);
    }
    async clickOndeleteAccountBtn(){
        await this.clickOn(this.deleteAccountBtn);
    }
    async verifyThatYouAreInHomePage(){
        await expect(this.homePageBtn).toHaveAttribute('style','color: orange;');
    }
    
}