import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from "./../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;

  constructor(public PostService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.PostService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.PostService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      }
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.PostService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.PostService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
