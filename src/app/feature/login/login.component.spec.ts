import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from '../../core/service/authentication.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockAuthService: jasmine.SpyObj<AuthenticationService>
  let router: Router;

  beforeEach(async () => {

    mockAuthService = jasmine.createSpyObj<AuthenticationService>('AuthenticationService', ['login'])

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoginComponent,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: mockAuthService }],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

      mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be create service', () => {
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => { 
    expect(component.loginForm.controls['username'].value).toBe(''); 
    expect(component.loginForm.controls['password'].value).toBe(''); 
  });

  it('should display error message when form is invalid on submit', () => { 
    component.onSubmit(); 
    expect(component.error).toBe(''); 
    expect(component.submitted).toBeTruthy(); expect(component.loginForm.invalid).toBeTruthy(); 
  });

  it('should display error message when form is invalid when authentication service call on submit', () => { 
    mockAuthService.login.and.returnValue(of({}));
    component.loginForm.controls['username'].setValue('admin@gmail.com');
    component.loginForm.controls['password'].setValue('admin');
    component.onSubmit(); 
    expect(mockAuthService.login.calls.any()).toBe(true, 'login called');

  });


});
