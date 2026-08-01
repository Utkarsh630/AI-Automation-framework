import { expect, test } from '@playwright/test';
import { SearchPage } from './support/search-page';

async function verifySearch(page: import('@playwright/test').Page, query: string, expectedText: RegExp) {
  const searchPage = new SearchPage(page);
  await searchPage.open();
  await searchPage.search(query);
  await expect(page).toHaveURL(/\/search\?/);
  const results = page.getByRole('link', { name: expectedText });
  await expect(results.first()).toBeVisible();
  return results;
}

test('SCRUM-6 AC-2/AC-3: partial-keyword and brand search', async ({ browser }) => {
  const partialPage = await browser.newPage();
  const partialResults = await verifySearch(partialPage, 'iph', /iPhone/i);
  await expect(partialResults.first()).toContainText(/iPhone/i);
  const brandPage = await browser.newPage();
  const brandResults = await verifySearch(brandPage, 'Nike', /Nike/i);
  await expect(brandResults.first()).toContainText(/Nike/i);
  await partialPage.close();
  await brandPage.close();
});
