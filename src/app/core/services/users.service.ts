import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Login, Usuario } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public register(user: Usuario) {
    return this.http.post(`${baserUrl}/auth/register`, user);
  }

  public login(user: Login) {
    return this.http.post(`${baserUrl}/auth/login`, user);
  }

  // Obtener datos del usuario
  public getCurrentUser() {
    return this.http.get(`${baserUrl}/user`);
  }
}
