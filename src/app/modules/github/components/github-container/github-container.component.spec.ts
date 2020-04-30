import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubContainerComponent } from './github-container.component';

import { GithubModule } from '../../github.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GithubContainerComponent', () => {
  let component: GithubContainerComponent;
  let fixture: ComponentFixture<GithubContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        GithubModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tabs', () => {
    const fixture = TestBed.createComponent(GithubContainerComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-tab-group')).toBeTruthy();
  });


  it('should Call filterChange', () => {
    const fixture = TestBed.createComponent(GithubContainerComponent);
    const component = fixture.debugElement.componentInstance;
    var spy = spyOn(component, "filterChange").and.callThrough();
    fixture.detectChanges();
    expect(spy);
    expect(component.filterChange).toHaveBeenCalled();
  });
});
