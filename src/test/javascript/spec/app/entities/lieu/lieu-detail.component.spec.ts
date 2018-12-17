/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEvenementTestModule } from '../../../test.module';
import { LieuDetailComponent } from 'app/entities/lieu/lieu-detail.component';
import { Lieu } from 'app/shared/model/lieu.model';

describe('Component Tests', () => {
    describe('Lieu Management Detail Component', () => {
        let comp: LieuDetailComponent;
        let fixture: ComponentFixture<LieuDetailComponent>;
        const route = ({ data: of({ lieu: new Lieu(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEvenementTestModule],
                declarations: [LieuDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LieuDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LieuDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.lieu).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
