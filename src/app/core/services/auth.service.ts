import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:8080`;

  constructor(private http: HttpClient) { }

  login(data: {email: string, senha: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  }
}
