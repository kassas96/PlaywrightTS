import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import {SignupPage} from '../pages/signUpPage';
import { RegisterPage } from '../pages/registerPage';
import signupTestData from '../testData/signupTestData.json';

test.describe('Signup Tests', () => {
    let homePage: HomePage;
    let signupPage: SignupPage;
    let registerPage:RegisterPage;
  
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      signupPage = new SignupPage(page);
      registerPage = new RegisterPage(page);
      
      await homePage.navigateToHomePage();
      await homePage.verifyThatYouAreInHomePage();
    });
  
    test('Registration flow', async ({ page }) => {
      test.info().annotations.push({type:'feature',description:'Registration'},
        {type:'description',description:'I regestire with valid credinials then delete the account'}
      );
      await homePage.clickOnLoginBtn();
      await signupPage.signup(signupTestData.validName, signupTestData.validEmail);
      await registerPage.fillRegisterationForm('Mr',signupTestData.validPassword,11,1,1996,true,true,signupTestData.firstName,signupTestData.lastName,
            signupTestData.company,signupTestData.address,"United States",signupTestData.state,signupTestData.city,signupTestData.zipcode,signupTestData.mobileNumber);
      await registerPage.clickOncreateAccountBtn();
      await registerPage.verifyThatAccountIsCreated();
      await registerPage.clickOnContinueBtn();
      await homePage.clickOndeleteAccountBtn();
      await registerPage.verifyThatAccountIsDeleted();
      await registerPage.clickOnContinueBtn();
    
      await registerPage.takescr();
    });
  });