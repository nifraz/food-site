import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTemplateComponent } from './recipe-template.component';

describe('RecipeTemplateComponent', () => {
  let component: RecipeTemplateComponent;
  let fixture: ComponentFixture<RecipeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
