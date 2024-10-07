import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from 'playwright';

let browser: any;
let page: any;

Given('I am on the login page', { timeout: 30000 }, async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/auth/login');
});

When('I enter the username {string}', async (username: string) => {
  const usernameSelector = 'input[name="username"]';
  await page.waitForSelector(usernameSelector, { timeout: 10000 });
  await page.fill(usernameSelector, username);
});

When('I enter the password {string}', async (password: string) => {
  const passwordSelector = 'input[name="password"]';
  await page.waitForSelector(passwordSelector, { timeout: 10000 });
  await page.fill(passwordSelector, password);
});

When('I click the login button', async () => {
  const loginButtonSelector = 'button[type="submit"]';
  await page.click(loginButtonSelector);
});

Then('I should be logged in successfully', { timeout: 30000 }, async () => {
  // Instead of waiting for navigation, we wait for the URL to change
  await page.waitForTimeout(5000);  // Adding a brief wait to allow for page load

  const dashboardUrl = 'https://opensource-demo.orangehrmlive.com/dashboard/index';
  const currentURL = page.url();

  if (currentURL !== dashboardUrl) {
    throw new Error(`Login failed or incorrect redirection. Expected: ${dashboardUrl}, but got: ${currentURL}`);
  }

  console.log('Login successful and redirected to the correct URL.');
  await browser.close();
});
