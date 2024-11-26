import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getData(entityName: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(entityName);
  }

  linkEntities(firstEntity: string, secondEntity: string, valueFirstEntity: string, valueSecondEntity: string): Observable<any> {
    return this.http.post<Observable<any>>(`${firstEntity}/${valueFirstEntity}/${secondEntity}/${valueSecondEntity}`, {});
  }
}
