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

    readonly addressInformationTitle: Locator;
    readonly firstNameInputField: Locator;
    readonly lastNameInputField: Locator;
    readonly companyInputField: Locator;
    readonly AddressInputField: Locator;
    readonly countryDropDownMenu: Locator;
    readonly stateInputField: Locator;
    readonly cityInputField: Locator;
    readonly zipCodeInputField: Locator;
    readonly mobileNumberInputField: Locator;
    readonly createAccountBtn: Locator;
    readonly accountCreatedTxt: Locator; 
    readonly continueBtn: Locator;
    readonly accountDeletedTxt: Locator; 

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
        this.addressInformationTitle = page.getByText('Address Information');
        this.firstNameInputField = page.getByLabel('First name ');
        this.lastNameInputField=page.getByLabel('Last name ');
        this.companyInputField=page.locator('#company');
        this.AddressInputField= page.locator('#address1');
        this.countryDropDownMenu= page.locator('#country');
        this.stateInputField =page.getByLabel('State ');
        this.cityInputField=page.getByLabel('City ');
        this.zipCodeInputField=page.locator('#zipcode')
        this.mobileNumberInputField=page.getByLabel('Mobile Number ');
        this.createAccountBtn= page.getByRole('button',{name:'Create Account'});
        this.accountCreatedTxt= page.getByText('Account Created!');
        this.continueBtn=page.getByRole('link',{name:"Continue"});
        this.accountDeletedTxt= page.getByText('Account Deleted!');

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
    async scrollToaddressInformationTitle(){
        await this.scrollToElement(this.addressInformationTitle);
    }
    async enterFirstName(firstName:string){
        await this.typeTextIn(firstName,this.firstNameInputField);
    }
    async enterLastName(lastname:string){
        await this.typeTextIn(lastname,this.lastNameInputField);
    }
    async enterCompany(company:string){
        await this.typeTextIn(company,this.companyInputField);
    }
    async enterAddress(address:string){
        await this.typeTextIn(address,this.AddressInputField);
    }
    async enterState(state:string){
        await this.typeTextIn(state,this.stateInputField);
    }
    async enterCity(city:string){
        await this.typeTextIn(city,this.cityInputField);
    }
    async enterZipCode(zipCode:string|number){
        const zipCodeString=typeof(zipCode)==='number'?zipCode.toString():zipCode;
        await this.typeTextIn(zipCodeString,this.zipCodeInputField);
    }
    async enterMobileNumber(mobileNumber:string|number){
        const mobileNumberStr=typeof(mobileNumber)==='number'?mobileNumber.toString():mobileNumber;
        await this.typeTextIn(mobileNumberStr,this.mobileNumberInputField);
    }
    async selectCountry(country:'Singapore'|'Singapore'|'New Zealand'|'Australia'|'Canada'|'United States'|'India'){
        await this.countryDropDownMenu.selectOption(country);
        await expect(this.countryDropDownMenu).toHaveValue(country);
    }
    async clickOncreateAccountBtn(){
        await this.clickOn(this.createAccountBtn);
    }

    async fillRegisterationForm(title:'Mr'|'Mrs',password:string,day:string|number, month:string|number,
        year: string|number,checkSpecialOffers: boolean,checkNewsletterSubscription: boolean,
        firstName:string,lastname:string,company:string,address:string,
        country:'Singapore'|'Singapore'|'New Zealand'|'Australia'|'Canada'|'United States'|'India',
        state:string,city:string,zipCode:string|number,mobileNumber:string|number){
        await this.verifyYouAreInRegisterationPage();
        await this.selectGenderTitle(title);
        await this.enterNewAccountPassword(password);
        await this.selectBirthDay(day,month,year);
        await this.toggleNewsletterSubscription(checkNewsletterSubscription);
        await this.toggleReceiveSpecialOffers(checkSpecialOffers);
        await this.scrollToaddressInformationTitle();
        await this.enterFirstName(firstName);
        await this.enterLastName(lastname);
        await this.enterCompany(company);
        await this.enterAddress(address);
        await this.selectCountry(country);
        await this.enterState(state);
        await this.enterCity(city);
        await this.enterZipCode(zipCode);
        await this.enterMobileNumber(mobileNumber);
    }
    async verifyThatAccountIsCreated(){
        await expect(this.accountCreatedTxt).toBeVisible();
    }
    async verifyThatAccountIsDeleted(){
        await expect(this.accountDeletedTxt).toBeVisible();
    }
    async clickOnContinueBtn(){
        await this.clickOn(this.continueBtn);
    }

    async takescr(){
        await this.takeScreenShot("form");}
}