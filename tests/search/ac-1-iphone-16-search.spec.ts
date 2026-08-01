import { expect, test } from './support/fixtures';

test('SCRUM-6 AC-1: product-name search for iPhone 16', async ({ page, searchPage }) => {
  await searchPage.open();
  await searchPage.search('iPhone 16');
  await expect(page).toHaveURL(/\/search\?[^#]*q=iPhone(?:%20|\+)16/i);
  await expect(searchPage.searchBox).toHaveValue('iPhone 16');
  await expect(page.getByText(/Showing .* results for ["']iPhone 16["']/i)).toBeVisible();
  const firstProduct = page.getByRole('link', { name: /Apple iPhone 16 \(/i }).first();
  await expect(firstProduct).toBeVisible();
  const productPagePromise = page.context().waitForEvent('page');
  await firstProduct.click();
  const productPage = await productPagePromise;
  await expect(productPage).toHaveURL(/\/apple-iphone-16-/i);
});
