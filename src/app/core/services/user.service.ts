import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://localhost:8080`;

  constructor(private http: HttpClient) { }

  createUser(data: { nome: string, email: string, senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`,
                          data,
                          {
                            headers: {
                              'Content-Type': "application/json"
                            }
                          }
                        );
  }
}
