import { AppPage } from './app.po';
import { browser, By, by, element, protractor, until } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display EventHub text', () => {
    expect(page.getTitleText()).toEqual('Eventhub');
  });

  it('Should assert typed text', () => {
    let input = page.getSearchInput();
    input.sendKeys('flowdesk');
    expect(input.getAttribute('value')).toEqual('flowdesk');
  });
});
