import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPost } from 'app/shared/model/core/post.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-post-detail',
    templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
    post: IPost;

    constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ post }) => {
            post.content = this.sanitizer.bypassSecurityTrustHtml(post.content);
            this.post = post;
        });
    }

    previousState() {
        window.history.back();
    }
}
