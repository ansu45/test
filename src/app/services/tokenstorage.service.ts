import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ROLE='auth_role';
const USER_ROUTE='auth_route';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {
  constructor() { }
  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  public getRole() {
    return JSON.parse(sessionStorage.getItem(USER_ROLE));
  }
  public saveRole(role) {
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, JSON.stringify(role));;
  }
  public getRoute() {
    return JSON.parse(sessionStorage.getItem(USER_ROUTE));
  }
  public saveRoute(userroute) {
    window.sessionStorage.removeItem(USER_ROUTE);
    window.sessionStorage.setItem(USER_ROUTE, JSON.stringify(userroute));;
  }
}