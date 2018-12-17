/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEvenementTestModule } from '../../../test.module';
import { MembreUpdateComponent } from 'app/entities/membre/membre-update.component';
import { MembreService } from 'app/entities/membre/membre.service';
import { Membre } from 'app/shared/model/membre.model';

describe('Component Tests', () => {
    describe('Membre Management Update Component', () => {
        let comp: MembreUpdateComponent;
        let fixture: ComponentFixture<MembreUpdateComponent>;
        let service: MembreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEvenementTestModule],
                declarations: [MembreUpdateComponent]
            })
                .overrideTemplate(MembreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MembreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembreService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Membre(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.membre = entity;
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
                    const entity = new Membre();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.membre = entity;
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
