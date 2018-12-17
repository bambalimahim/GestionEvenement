/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEvenementTestModule } from '../../../test.module';
import { PresenceDeleteDialogComponent } from 'app/entities/presence/presence-delete-dialog.component';
import { PresenceService } from 'app/entities/presence/presence.service';

describe('Component Tests', () => {
    describe('Presence Management Delete Component', () => {
        let comp: PresenceDeleteDialogComponent;
        let fixture: ComponentFixture<PresenceDeleteDialogComponent>;
        let service: PresenceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEvenementTestModule],
                declarations: [PresenceDeleteDialogComponent]
            })
                .overrideTemplate(PresenceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PresenceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PresenceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
