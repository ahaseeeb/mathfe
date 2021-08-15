import { NgmathPage } from './app.po';

describe('ngmath App', () => {
  let page: NgmathPage;

  beforeEach(() => {
    page = new NgmathPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to ag!!');
  });
});
