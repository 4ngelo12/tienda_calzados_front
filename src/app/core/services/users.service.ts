import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Login, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post(`${baseUrl}/auth/register`, user);
  }

  public login(user: Login) {
    return this.http.post(`${baseUrl}/auth/login`, user);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Obtener datos del User
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/user`);
  }
}
