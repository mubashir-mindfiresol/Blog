import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostModel } from '../../services/post/post-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  @Input() posts: PostModel[];
  p: number = 1;
  post: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/'+JSON.parse(window.sessionStorage.getItem('auth-user')).username+'/' + id);
  }

  onPageChange(page) {
    this.p = page;
 }
}