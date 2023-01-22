import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalService } from './local-storage.service';
import { Trek, Comment, registerForm } from './trek';
// import { Token } from './token';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  URL: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private localStore: LocalService) {
  }

  getAllTreks(): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
    return this.http.get<any>(this.URL + '/api/getAllTreks/', {headers})
  }

  getTrekData(id: number): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
    return this.http.get<any>(this.URL + '/api/getAllTreks/' + String(id) + '/', {headers})
  }

  addTrek(data: Trek): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
    return this.http.post<any>(this.URL + '/api/addTrek/', data, { headers })
  }

  deleteTrek(id: number): Observable<any> {
    return this.http.post<any>(this.URL + '/api/deleteTrek/' + String(id) + '/', {})
  }

  joinToTrek(id: number): Observable<any> {
    return this.http.post<any>(this.URL + '/api/joinToTrek/' + String(id) + '/', {})
  }

  rejoinFromTrek(id: number): Observable<any> {
    return this.http.post<any>(this.URL + '/api/rejoinFromTrek/' + String(id) + '/', {})
  }

  getUsernameFromPK(id: number): Observable<any>{
    const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token'))};
    return this.http.get<any>(this.URL + '/api/getUsernameFromID/' + String(id) + '/', {headers})
  }
  getComments(id: number): Observable<any> {
    return this.http.get<any>(this.URL + '/api/getComments/' + String(id) + '/')
  }

  addComment(data: Comment, trek_id: number): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
    return this.http.post<any>(this.URL + '/api/addComment/' + String(trek_id) + '/', data, {headers})
  }

  deleteComment(trek_id: number, comment_id: number): Observable<any> {
    return this.http.post<any>(this.URL + '/api/deleteComment/' + String(trek_id) + '/' + String(comment_id) + '/', {})
  }











  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.URL + '/auth/login/', { "username": username, "password": password })
  }

  register(formData: registerForm): Observable<any> {
    return this.http.post<any>(this.URL + '/auth/register/', formData)
  }

  logout(): Observable<any> {
      const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
      return this.http.post<any>(this.URL + '/auth/logout_all/', {}, { headers })
  }

  // getAllTreks(): Observable<any> {
  //     const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
  //     return this.http.get<any>(this.URL + '/api/getAllTreks/', { headers })
  // }

  // getTrekData(id: number): Observable<any> {
  //     const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
  //     return this.http.get<any>(this.URL + '/api/getAllTreks/' + String(id) + '/', { headers })
  // }

  // addMsgToTrek(id: number): Observable<any> {
  //     const headers = { 'Authorization': 'Bearer ' + String(this.localStore.getData('access_token')) };
  //     return this.http.post<any>(this.URL + '/api/addToCart/' + String(id) + '/',{}, { headers })
  // }

}
