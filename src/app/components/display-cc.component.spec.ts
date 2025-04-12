import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCCComponent } from './display-cc.component';

describe('DisplayCCComponent', () => {
  let component: DisplayCCComponent;
  let fixture: ComponentFixture<DisplayCCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
