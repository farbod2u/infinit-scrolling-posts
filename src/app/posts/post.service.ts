import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/posts'; // Replace with your actual backend URL
  private posts: Post[] = []

  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number): Observable<Post[]> {
    const queryParams = `?page=${page}&pageSize=${pageSize}`;

    return this.http.get<Post[]>(this.apiUrl + queryParams);
  }

}
