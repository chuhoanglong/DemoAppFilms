describe('App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a List Films screen as home screen', async () => {
    await waitFor(element(by.text('Movies')))
      .toBeVisible()
      .withTimeout(3000);
  });

  it('should show Favorites Screen after tap', async () => {
    await element(by.id('BottomTab.FilmFavorites')).tap();
    await expect(element(by.text('Favorites'))).toBeVisible();
  });

  it('should show Watched Screen after tap', async () => {
    await element(by.id('BottomTab.FilmWatched')).tap();
    await expect(element(by.text('Watched'))).toBeVisible();
  });
});
