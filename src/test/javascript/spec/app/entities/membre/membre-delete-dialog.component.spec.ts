/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEvenementTestModule } from '../../../test.module';
import { MembreDeleteDialogComponent } from 'app/entities/membre/membre-delete-dialog.component';
import { MembreService } from 'app/entities/membre/membre.service';

describe('Component Tests', () => {
    describe('Membre Management Delete Component', () => {
        let comp: MembreDeleteDialogComponent;
        let fixture: ComponentFixture<MembreDeleteDialogComponent>;
        let service: MembreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEvenementTestModule],
                declarations: [MembreDeleteDialogComponent]
            })
                .overrideTemplate(MembreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MembreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembreService);
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
