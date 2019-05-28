/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PostUpdateComponent } from 'app/entities/core/post/post-update.component';
import { PostService } from 'app/entities/core/post/post.service';
import { Post } from 'app/shared/model/core/post.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('Component Tests', () => {
    describe('Post Management Update Component', () => {
        let comp: PostUpdateComponent;
        let fixture: ComponentFixture<PostUpdateComponent>;
        let service: PostService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule, ReactiveFormsModule],
                declarations: [PostUpdateComponent]
            })
                .overrideTemplate(PostUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PostUpdateComponent);
            comp = fixture.componentInstance;
            comp.post = new Post('123');
            comp.createPostEditFormGroup();
            service = fixture.debugElement.injector.get(PostService);
        });

        function createPostEditFormGroup(valid) {
            comp.postEditFormGroup.controls['title'].setValue('testing title');
            comp.postEditFormGroup.controls['content'].setValue('testing content');
            comp.postEditFormGroup.controls['excerpt'].setValue('testing excerpt');
            comp.postEditFormGroup.controls['updates'].setValue('testing updates');
            comp.postEditFormGroup.controls['slug'].setValue('testing slug');
            comp.postEditFormGroup.controls['formatId'].setValue('12121');
            comp.postEditFormGroup.controls['degaUsers'].setValue([{ id: '123' }]);
            if (!valid) {
                comp.postEditFormGroup.controls['title'].setValue('');
            }
        }

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Post('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.post = entity;
                // WHEN
                createPostEditFormGroup(true);
                comp.saveOrPublish('Publish');
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(comp.postEditFormGroup.value);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
