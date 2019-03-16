import { PostService } from "./../posts.service";
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public PostService: PostService) {}

  ngOnInit() {
    this.posts = this.PostService.getPosts();
    this.postsSub = this.PostService.getPostUpdateListener().subscribe(
      (posts: Post[]) => (this.posts = posts)
    );
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
