import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  page = 1;
  pageSize = 5; // Initial number of posts to load

  threshold = 0.8; // load just 80% screen height 
  isLoading = false;

  private postsSub: Subscription = new Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    /***
     * to avoid memory leak
     */
    this.postsSub.unsubscribe();
  }


  // fetch posts data from service
  loadPosts(): void {
    // if still not compelete data loading then just return
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    // assign read posts subscription to local variable 
    // to free up it later to prevent memory leak
    this.postsSub = this.postService.getPosts(this.page, this.pageSize).subscribe({
      next: (newPosts) => {
        this.posts = [...this.posts, ...newPosts];
        this.page++;
        this.isLoading = false;

        console.dir(newPosts)
      },
      error: (error) => {
        this.isLoading = false;

        console.error('Error loading posts:', error);
      }
    });
  }

  // if scroll down and no more posts then lode more posts
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight * this.threshold
    ) {
      this.loadPosts();
    }
  }


}
