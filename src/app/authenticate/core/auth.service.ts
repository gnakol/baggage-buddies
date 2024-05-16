import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;

  bearerToken! : string;

  roles : any;

  username : any;

  constructor(@Inject(PLATFORM_ID) private platformId : Object, private http : HttpClient, private route : Router) {
    this.checkToken();
   }

  public login(username : string, password : string)
  {
    let options = {
      headers : new HttpHeaders().set("Content-Type", "application/json")
    };

    const body = { username: username, password: password };

    return this.http.post("http://localhost:9000/baggage-buddies/connexion", body, options);
  }

  loadProfile(data : any)
  {
    this.isAuthenticated = true;

    this.bearerToken = data['bearer'];

    localStorage.setItem('token', this.bearerToken);

    let decodedJwt : any = jwtDecode(this.bearerToken);

    this.username = decodedJwt.sub;

    this.roles = decodedJwt.scope;
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.bearerToken = token;
        this.isAuthenticated = true;
        let decodedJwt: any = jwtDecode(token);
        this.username = decodedJwt.sub;
        this.roles = decodedJwt.scope;
      }
    }
  }

  isAuthenticate(): boolean {
    const token = localStorage.getItem('token');
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  // deconnexion 
  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.route.navigate(['/login']);
  }
}
