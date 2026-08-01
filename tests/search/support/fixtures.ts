import { test as base } from '@playwright/test';
import { SearchPage } from './search-page';

export const test = base.extend<{ searchPage: SearchPage }>({
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
});

export { expect } from '@playwright/test';
