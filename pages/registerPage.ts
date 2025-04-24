import { Page,Locator,expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class RegisterPage extends BasePage{
    readonly accountInfoTitle:Locator;
    readonly genderTitle:Locator;
    readonly passwordInputField: Locator;
    readonly daysDropDownMenu: Locator;
    readonly monthsDropDownMenu: Locator;
    readonly yearsDropDownMenu: Locator;
    readonly signUpForOurNewsletterCheckBox: Locator;
    readonly receiveSpecialOffersCheckBox: Locator;

    constructor(page:Page){
        super(page);
        this.accountInfoTitle=page.getByText('Enter Account Information');
        this.genderTitle=page.getByLabel("Title");
        this.passwordInputField=page.getByLabel('Password ');
        this.daysDropDownMenu=page.locator("#days");
        this.monthsDropDownMenu=page.locator("#months");
        this.yearsDropDownMenu=page.locator("#years");
        this.signUpForOurNewsletterCheckBox=page.getByRole('checkbox',{'name':'Sign up for our newsletter!'});
        this.receiveSpecialOffersCheckBox=page.getByRole('checkbox',{'name':'Receive special offers from our partners!'});

    }

    async verifyYouAreInRegisterationPage(){
        await expect(this.accountInfoTitle).toBeVisible();
    }
    async selectGenderTitle(title:'Mr'|'Mrs'){
        await this.page.locator(`[type='radio'][value='${title}']`).click();
    }
    async enterNewAccountPassword(Password:string){
        await this.typeTextIn(Password,this.passwordInputField);
    }
    async selectDayFromDropDownMenu(day:string|number){
        const dayValue=typeof(day)==='number'?day.toString():day;
        await this.daysDropDownMenu.selectOption(dayValue);
        await expect(this.daysDropDownMenu).toHaveValue(dayValue);
    }
    async selectMonthFromDropDownMenu(month:string|number){
        if(typeof(month)==='number'){
            await this.monthsDropDownMenu.selectOption(month.toString());
        }else{
            await this.monthsDropDownMenu.selectOption({label:month});
        }
    }
    async selectYearFromDropDownMenu(year: string|number){
        const yearValue=typeof(year)==='number'?year.toString():year;
        await this.yearsDropDownMenu.selectOption(year.toString());
        await expect(this.yearsDropDownMenu).toHaveValue(yearValue);
    }
    async selectBirthDay(day:string|number, month:string|number,year: string|number){
        await this.selectDayFromDropDownMenu(day);
        await this.selectMonthFromDropDownMenu(month);
        await this.selectYearFromDropDownMenu(year);
    }
    async toggleNewsletterSubscription(check: boolean){
        if(check){
            await this.signUpForOurNewsletterCheckBox.check();
        }else{
            await this.signUpForOurNewsletterCheckBox.uncheck();
        }
    }
    async toggleReceiveSpecialOffers(check: boolean){
        if(check){
            await this.receiveSpecialOffersCheckBox.check();
        }else{
            await this.receiveSpecialOffersCheckBox.uncheck();
        }
    } 


    async fillRegisterationForm(title:'Mr'|'Mrs',password:string,day:string|number, month:string|number,year: string|number,checkSpecialOffers: boolean,checkNewsletterSubscription: boolean){
        await this.verifyYouAreInRegisterationPage();
        await this.selectGenderTitle(title);
        await this.enterNewAccountPassword(password);
        await this.selectBirthDay(day,month,year);
        await this.toggleNewsletterSubscription(checkNewsletterSubscription);
        await this.toggleReceiveSpecialOffers(checkSpecialOffers);
    }

    async takescr(){
        await this.takeScreenShot("form");}
}