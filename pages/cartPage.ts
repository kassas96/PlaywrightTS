import { BasePage } from "./basePage";
import { Page,Locator,expect } from "@playwright/test";

export class CartPage extends BasePage{

    constructor(page:Page){
        super(page);
        
    }
}