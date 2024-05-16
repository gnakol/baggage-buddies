import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../authenticate/core/auth.service';
import { Observable } from 'rxjs';
import { Announcement } from './bean/announcement';

interface AnnouncementResponse {
  content: Announcement[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private baseUrl = 'http://localhost:9000/baggage-buddies/announcement';

  constructor(private http : HttpClient, private authService : AuthService){}

  public getAllAnnouncements(): Observable<AnnouncementResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.bearerToken}`
    });

    return this.http.get<AnnouncementResponse>(`${this.baseUrl}/all-announcement`, { headers: headers });
  }
}
