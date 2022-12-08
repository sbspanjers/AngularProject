import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooklistComponent } from './cooklist.component';

describe('CooklistComponent', () => {
  let component: CooklistComponent;
  let fixture: ComponentFixture<CooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CooklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
