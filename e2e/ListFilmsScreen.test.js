const {device, element, by, waitFor} = require('detox');

describe('ListFilmsScreen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a ListFilms screen as home screen', async () => {
    await waitFor(element(by.text('Movies')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should the like button will light up after click', async () => {
    const testIDButton = 'listFilms.buttonLike-1.like';
    const testIDIcon = 'listFilms.iconLike-1.like';
    await waitFor(element(by.id(testIDButton)))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id(testIDButton)).tap();
    await expect(element(by.id(testIDIcon))).toBeVisible();
  });

  it('should the like button will turn off after click', async () => {
    const testIDButton = 'listFilms.buttonLike-1.like';
    const testIDIconUnLike = 'listFilms.iconLike-1.unlike';

    await waitFor(element(by.id(testIDButton)))
      .toBeVisible()
      .withTimeout(3000);
    // Click the like button
    await element(by.id(testIDButton)).tap();
    // Click the like button again to unlike
    await element(by.id(testIDButton)).tap();

    await expect(element(by.id(testIDIconUnLike))).toBeVisible();
  });

  it('should go to the movie details screen when click the Watch button', async () => {
    const testIDButton = 'listFilms.buttonWatch-1.watch';
    await waitFor(element(by.id(testIDButton)))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id(testIDButton)).tap();
    await waitFor(element(by.text('Book Ticket')))
      .toBeVisible()
      .withTimeout(3000);
  });
});
