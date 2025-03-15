import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ILoginResponse, LoginDto } from '../../../domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.URL_API;

  login(data: LoginDto): Observable<ILoginResponse> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<ILoginResponse>(url, data);
  }
}
