import { Page,Locator,expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class SignupPage extends BasePage{
    nameInputField:Locator;
    emailInputField:Locator;
    signupBtn:Locator;
    newUserSignupTitle: Locator;

    constructor(page: Page){
        super(page);
        this.newUserSignupTitle= page.getByText("New User Signup!");
        this.nameInputField= page.getByPlaceholder('Name');
        this.emailInputField= page.locator("input[data-qa='signup-email']");
        this.signupBtn= page.getByRole('button',{name:'Signup'});
    }

    async verifyYouAreAtSignupPage(){
        await expect(this.newUserSignupTitle).toBeVisible();
    }
    
    async signup(name:string, email:string){
        await this.typeTextIn(name,this.nameInputField);
        await this.typeTextIn(email,this.emailInputField)
        await this.clickOn(this.signupBtn);
    }
}