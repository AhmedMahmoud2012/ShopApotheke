import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepositoryResponse, Language } from '../types';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {


  public languages: Language[] = [
    {
      name: "JavaScript",
      label: "JavaScript"
    },
    {
      name: "Python",
      label: "Python"
    },
    {
      name: "Java",
      label: "Java"
    },
    {
      name: "C++",
      label: "C++"
    },
    {
      name: "Ruby",
      label: "Ruby"
    },
    {
      name: "TypeScript",
      label: "TypeScript"
    },
    {
      name: "PHP",
      label: "PHP"
    },
    {
      name: "C#",
      label: "C#"
    },
    {
      name: "C",
      label: "C"
    },
    {
      name: "Scala",
      label: "Scala"
    }
  ]
  constructor(private readonly httpClient: HttpClient) { }



  getDate(uri: string): Observable<RepositoryResponse> {
    return this.httpClient.get<RepositoryResponse>(uri)
      .pipe(shareReplay(1))
  }
}
