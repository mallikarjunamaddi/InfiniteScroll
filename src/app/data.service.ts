import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { ImageString } from './models/ImageString';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) { 
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getImageStrings(pageIndex:number, pageSize:number): Observable<ImageString> {
    const slug = '/GetImageStrings';
    const endPointURL = this.apiURL + slug;
    let params = new HttpParams();
    params = params.append("pageIndex", pageIndex.toString());
    params = params.append("pageSize", pageSize.toString());
    return this.http.get<ImageString>(endPointURL, {params: params})
                    .pipe(catchError(this.handleError));
  }
}
