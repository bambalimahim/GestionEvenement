/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEvenementTestModule } from '../../../test.module';
import { PresenceDetailComponent } from 'app/entities/presence/presence-detail.component';
import { Presence } from 'app/shared/model/presence.model';

describe('Component Tests', () => {
    describe('Presence Management Detail Component', () => {
        let comp: PresenceDetailComponent;
        let fixture: ComponentFixture<PresenceDetailComponent>;
        const route = ({ data: of({ presence: new Presence(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEvenementTestModule],
                declarations: [PresenceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PresenceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresenceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.presence).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
