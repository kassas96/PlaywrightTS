import { Page,Locator } from "@playwright/test";

export class BasePage{
    readonly page:Page;

constructor(page:Page){
    this.page=page;
}

async navigateToPage(url:string){
    await this.page.goto(url);
}

async reload(){
    await this.page.reload();
}

async typeTextIn(text:string , locator: string | Locator){
    const element= typeof locator ==='string'? this.page.locator(locator): locator;
    await element.waitFor({state:"visible"});
    await element.fill(text);
}

async clickOn(locator: string | Locator){
    const element= typeof locator ==='string'? this.page.locator(locator): locator;
    await element.waitFor({state:"visible"});
    await element.click();
}

async waitForNetworkIdel(timeout=5000){
    await this.page.waitForLoadState('networkidle',{timeout})
}
async takeScreenShot(screenName:string){
    await this.page.screenshot({
        path:`test-results/screenshots/${screenName}_${Date.now()}.png`,
        fullPage:true,
    })
}

}