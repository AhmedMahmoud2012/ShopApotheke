import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbarComponent } from './filter-bar.component';
import { GithubModule } from '../../github.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterbarComponent', () => {
  let component: FilterbarComponent;
  let fixture: ComponentFixture<FilterbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        GithubModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Call applyFilter', () => {
    const fixture = TestBed.createComponent(FilterbarComponent);
    const component = fixture.debugElement.componentInstance;
    var spy = spyOn(component, "applyFilter").and.callThrough();
    fixture.detectChanges();
    expect(spy);
    expect(component.applyFilter).toHaveBeenCalled();
  });
});
