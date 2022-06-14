import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/api/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }


  /** GET usuarios del servidor */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + 'usuarios')
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  } 

  /** GET usuario por id */
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}usuario/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** POST: agregar usuario nuevo*/
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl + 'usuarios', user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: eliminar usuario del servidor */
  deleteUser(id: number): Observable<User> {
    const url = `${this.userUrl}usuarios/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser')) 
    );
  }
  /** PUT: editar usuario por id */
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.userUrl}usuario/${user.id}`, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }
  /** GET chiste aleatorio */
  getJoke(): Observable<any> {
    const url = "https://v2.jokeapi.dev/joke/Programming"
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getJoke`))
    );
  }

  /** Loguear error*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      return of(result as T);
    };
  }

}
