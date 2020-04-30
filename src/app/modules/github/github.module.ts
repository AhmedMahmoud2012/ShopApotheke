import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RepositoryComponent, FilterbarComponent, StarredRepositoriesComponent, GithubContainerComponent } from './components';
import { StarsPipe } from './pipes';
import { HttpClientModule } from '@angular/common/http';

const components = [
  RepositoryComponent, StarredRepositoriesComponent, FilterbarComponent, GithubContainerComponent, StarsPipe
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [...components, SharedModule, HttpClientModule],
  providers: [StarsPipe]
})
export class GithubModule { }
