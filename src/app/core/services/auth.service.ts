import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login, User } from '../interfaces';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post(`${baseUrl}/auth/register`, user);
  }

  public login(user: Login) {
    return this.http.post(`${baseUrl}/auth/login`, user);
  }

  public validateAdmin(): boolean {
    const token = localStorage.getItem('token');

    try {
      const helper = new JwtHelperService();
      const decodedToken = token ? helper.decodeToken(token) : null;
      console.log(decodedToken?.role);

      if (decodedToken?.role !== 'ROLE_ADMIN') {
        return false;
      }

      console.log(decodedToken?.role);
      return true;
    } catch (error) {
      Error('Error al obtener el token');
      console.log(error);
    }

    return true;
  }
}
