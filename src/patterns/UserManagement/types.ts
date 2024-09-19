export enum AuthState {
  /** The authentication state hasn't loaded */
  Loading = 'Loading',
  /** A user is logged in */
  LoggedIn = 'LoggedIn',
  /** LoggedOut: There is no logged in user. */
  LoggedOut = 'LoggedOut',
}
