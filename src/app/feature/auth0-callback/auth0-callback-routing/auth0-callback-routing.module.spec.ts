import { Auth0CallbackRoutingModule } from './auth0-callback-routing.module';

describe('Auth0CallbackRoutingModule', () => {
  let auth0CallbackRoutingModule: Auth0CallbackRoutingModule;

  beforeEach(() => {
    auth0CallbackRoutingModule = new Auth0CallbackRoutingModule();
  });

  it('should create an instance', () => {
    expect(auth0CallbackRoutingModule).toBeTruthy();
  });
});
