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
  isLoading = false;
  private postsSub: Subscription;

  constructor(public PostService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.PostService.getPosts();
    this.postsSub = this.PostService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }
    );
  }

  onDelete(postId: string) {
    this.PostService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
