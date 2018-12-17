/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEvenementTestModule } from '../../../test.module';
import { MembreDetailComponent } from 'app/entities/membre/membre-detail.component';
import { Membre } from 'app/shared/model/membre.model';

describe('Component Tests', () => {
    describe('Membre Management Detail Component', () => {
        let comp: MembreDetailComponent;
        let fixture: ComponentFixture<MembreDetailComponent>;
        const route = ({ data: of({ membre: new Membre(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEvenementTestModule],
                declarations: [MembreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MembreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MembreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.membre).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
