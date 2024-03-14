import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Login, User, UpdateUser } from '../interfaces';

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

  // Actualizar datos del User
  public updateUser(user: UpdateUser) {
    return this.http.patch(`${baseUrl}/user/${user.id}`, user);
  }

  // Eliminar User
  public deleteUser(id: number) {
    return this.http.delete(`${baseUrl}/user/${id}`);
  }
}
