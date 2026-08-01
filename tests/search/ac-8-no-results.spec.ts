import { expect, test } from '@playwright/test';
import { SearchPage } from './support/search-page';

test('SCRUM-6 AC-8: no-match query displays specified no-result page', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.open();
  await searchPage.search('XYZ123ABC');
  await expect(page.getByText('No products found', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /XYZ123ABC/i })).toHaveCount(0);
});
