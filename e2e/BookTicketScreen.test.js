const {device, element, by, waitFor} = require('detox');

describe('BookTicketScreen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  const goToTicketBookingScreen = async () => {
    const testIDButton = 'listFilms.buttonWatch-1.watch';
    await waitFor(element(by.id(testIDButton)))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id(testIDButton)).tap();
    await waitFor(element(by.text('Book Ticket')))
      .toBeVisible()
      .withTimeout(3000);
  };

  it(
    'should go to the movie details screen when click the Watch button',
    goToTicketBookingScreen,
  );

  it('should go to the movie you watched when click the book ticket button', async () => {
    await goToTicketBookingScreen();

    const testIDButtonTickeBook = 'ticketBookingScreen.buttonBook';
    const testIDButton = 'listFilms.buttonWatch-1.watch';
    await waitFor(element(by.id(testIDButtonTickeBook)))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id(testIDButtonTickeBook)).tap();
    await waitFor(element(by.id(testIDButton)))
      .toBeVisible()
      .withTimeout(3000);
  });
});
