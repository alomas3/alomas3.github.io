import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from '../services/trip-data';
import { Observable } from 'rxjs'; 
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripData: TripData
  ) {}

  public getToken(): string {
    const token = this.storage.getItem('uncles-token');
    return token ? token : '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('uncles-token', token);
  }

  public logout(): void {
    this.storage.removeItem('uncles-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripData.login(user, passwd).pipe(
      tap((value: AuthResponse) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      })
    );
  }

  public register(user: User, passwd: string): void {
    this.tripData.register(user, passwd).subscribe({
      next: (value: AuthResponse) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: (error) => {
        console.error('Register error:', error.message);
      },
    });
  }
}