import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleActorComponent } from './detalle-actor.component';
import { ActorService } from '../actor.service';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Actor } from '../actor.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavbarComponent {}

describe('DetalleActorComponent', () => {
  let component: DetalleActorComponent;
  let fixture: ComponentFixture<DetalleActorComponent>;
  let mockActorService: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    mockActorService = jasmine.createSpyObj('ActorService', ['detalleActor']);
    const activatedRouteStub = {
      snapshot: {
        params: {
          id: '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [DetalleActorComponent, MockNavbarComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActorService, useValue: mockActorService },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleActorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call detalleActor and set actor', () => {
    const mockActor: Actor = {
      id: '1',
      name: 'Actor 1',
      photo: 'photo1.jpg',
      nationality: 'Nationality 1',
      birthDate: new Date(),
      biography: 'Biography 1',
      movies: []
    };
    mockActorService.detalleActor.and.returnValue(of(mockActor));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.actor).toEqual(mockActor);
    expect(mockActorService.detalleActor).toHaveBeenCalledWith('1');
  });

  it('should navigate to movie on redirectToMovie', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.redirectToMovie('123');

    expect(navigateSpy).toHaveBeenCalledWith(['movies', '123']);
  });
});
