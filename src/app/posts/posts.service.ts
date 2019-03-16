import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<Post[]>("http://localhost:8080/api/posts").subscribe(data => {
      this.posts = data;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http
      .post<Post>("http://localhost:8080/api/posts", post)
      .subscribe(post => {
        console.log("post ", post);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
