import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgJsonEditorComponent } from './ng-json-editor.component';

describe('NgJsonEditorComponent', () => {
  let component: NgJsonEditorComponent;
  let fixture: ComponentFixture<NgJsonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgJsonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgJsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
