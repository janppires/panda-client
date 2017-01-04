import { PandaClientPage } from './app.po';

describe('panda-client App', function() {
  let page: PandaClientPage;

  beforeEach(() => {
    page = new PandaClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
