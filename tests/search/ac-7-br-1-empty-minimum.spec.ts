import { expect, test } from '@playwright/test';
import { SearchPage } from './support/search-page';

test('SCRUM-6 AC-7/BR-1: empty validation and one-character minimum', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.open();
  await searchPage.searchBox.press('Enter');
  await expect(page.getByText('Please enter a search keyword.', { exact: true })).toBeVisible();
  await expect(page).not.toHaveURL(/\/search\?/);
  await searchPage.searchBox.fill('a');
  await searchPage.searchBox.press('Enter');
  await expect(page).toHaveURL(/\/search\?/);
});
