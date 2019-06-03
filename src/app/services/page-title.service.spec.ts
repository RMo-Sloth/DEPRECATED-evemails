import { PageTitleService } from './page-title.service';

describe("The page title service", function() {
  let observable;
  let service: PageTitleService;

  beforeEach(() => {
    service = new PageTitleService();
    observable = service.get_pageTitle();
  });

  it( "has an initial value of 'EVE-mails.com'", function() {
    expect( observable.getValue() ).toBe( 'EVE-mails.com' );
  });

  it("changes the output of get_pageTitle() with set_pageTitle().", function() {
    service.set_pageTitle('New title');
    expect( observable.getValue() ).toBe( 'New title' );
  });

});
