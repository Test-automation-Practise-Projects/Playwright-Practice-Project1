import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from 'playwright';

let browser: any;
let page: any;

Given('I open the Google search page', { timeout: 10000 }, async () => {
  console.log('Launching browser...');
  browser = await chromium.launch({ headless: false }); 
  page = await browser.newPage();
  console.log('Navigating to Google...');
  await page.goto('https://www.google.com');
  console.log('Google page opened successfully.');
});

When('I type {string} in the search field and press Enter', { timeout: 30000 }, async (searchTerm: string) => {
  await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the page is fully loaded
  const searchInputXPath = '//*[@id="APjFqb"]'; // XPath for the Google search input field
  await page.waitForSelector(searchInputXPath, { timeout: 10000 }); // Wait for the input field to be visible
  console.log('Input field is visible, typing the search term...');

  // Use the XPath selector to fill the search term
  await page.fill(searchInputXPath, searchTerm);
  console.log(`Typed "${searchTerm}" in the search field.`);

  // Press Enter to submit the search
  await page.press(searchInputXPath, 'Enter');
  console.log('Pressed Enter to perform the search.');
});

Then('I should see the search results and close the browser', async () => {
  await page.waitForNavigation({ waitUntil: 'load' }); // Wait for the navigation to the results page
  console.log('Search results page opened successfully.');

  // Optionally, you can add some validation here for the search results
  // e.g., checking the title or specific content on the results page
  // const title = await page.title();
  // console.log(`Page title is: ${title}`);

  // Close the browser after the test
  await browser.close();
  console.log('Browser closed.');
});
