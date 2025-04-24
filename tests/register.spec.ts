import { test, expect } from '@playwright/test';
import { HomePage} from '../pages/HomePage';
import {SignupPage} from '../pages/signUpPage';
import { RegisterPage } from '../pages/registerPage';
import signupTestData from '../testData/signupTestData.json';
import { BasePage } from '../pages/basePage';
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
  
    test('navigate to sign up page', async ({ page }) => {
      await homePage.clickOnLoginBtn();
      await signupPage.signup(signupTestData.validName, signupTestData.validEmail);
      await registerPage.fillRegisterationForm('Mr',signupTestData.validPassword,11,1,1996,true,true);
      await registerPage.takescr();
    });
  });