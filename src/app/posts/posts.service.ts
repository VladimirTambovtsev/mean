import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(id: string) {
    return this.http.get<Post>(`http://localhost:8080/api/posts/${id}`);
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<Post[]>("http://localhost:8080/api/posts" + queryParams)
      .subscribe(data => {
        this.posts = data;
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost(title: string, content: string, image: string) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    const post: Post = { _id: null, title, content, imagePath: image };
    this.http
      .post<Post>("http://localhost:8080/api/posts", postData)
      .subscribe(post => {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(
    _id: string,
    title: string,
    content: string,
    image: File | string
  ) {
    let postData: Post | FormData;
    // const post: Post = { _id, title, content, image: null };
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("_id", _id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = { _id, title, content, imagePath: image };
    }
    this.http
      .patch(`http://localhost:8080/api/posts/${_id}`, postData)
      .subscribe(data => {
        this.posts = this.posts.filter(el => el._id !== _id);
        const post: Post = {
          _id,
          title,
          content,
          imagePath: ""
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:8080/api/posts/${postId}`)
      .subscribe((post: Post) => {
        this.posts = this.posts.filter(el => el._id !== post._id);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
