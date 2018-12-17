/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEvenementTestModule } from '../../../test.module';
import { PresenceUpdateComponent } from 'app/entities/presence/presence-update.component';
import { PresenceService } from 'app/entities/presence/presence.service';
import { Presence } from 'app/shared/model/presence.model';

describe('Component Tests', () => {
    describe('Presence Management Update Component', () => {
        let comp: PresenceUpdateComponent;
        let fixture: ComponentFixture<PresenceUpdateComponent>;
        let service: PresenceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEvenementTestModule],
                declarations: [PresenceUpdateComponent]
            })
                .overrideTemplate(PresenceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PresenceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresenceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Presence(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.presence = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Presence();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.presence = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
