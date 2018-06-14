import { Auth0CallbackModule } from './auth0-callback.module';

describe('Auth0CallbackModule', () => {
  let auth0CallbackModule: Auth0CallbackModule;

  beforeEach(() => {
    auth0CallbackModule = new Auth0CallbackModule();
  });

  it('should create an instance', () => {
    expect(auth0CallbackModule).toBeTruthy();
  });
});
