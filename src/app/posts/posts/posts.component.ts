import { Component, HostListener, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  page = 1;
  pageSize = 5; // Initial number of posts to load

  threshold = 0.8; // Adjust as needed
  isLoading = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.postService.getPosts(this.page, this.pageSize).subscribe(
      (newPosts) => {
        this.posts = [...this.posts, ...newPosts];
        this.page++;
        this.isLoading = false;

        console.dir(newPosts)
      },
      (error) => {
        console.error('Error loading posts:', error);
        this.isLoading = false;
      }
    );
  }

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
