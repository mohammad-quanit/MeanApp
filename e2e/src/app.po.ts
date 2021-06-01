import { $$, browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root nav a')).getText();
  }

  getSearchInput() {
    return element(by.id('search-event'));
  }

  getCardItems() {
    return element.all(by.id('card-item'));
  }
}
