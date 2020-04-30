import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredRepositoriesComponent } from './starred_repositories.component';
import { GithubModule } from '../../github.module';

describe('StarredRepositoriesComponent', () => {
  let component: StarredRepositoriesComponent;
  let fixture: ComponentFixture<StarredRepositoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        GithubModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarredRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const fixture = TestBed.createComponent(StarredRepositoriesComponent);
    const component = fixture.debugElement.componentInstance;
    var spy = spyOn(component, "load").and.callThrough();
    fixture.detectChanges();
    expect(spy);
    expect(component.load).toHaveBeenCalled();
  });
});
