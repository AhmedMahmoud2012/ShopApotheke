import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FilterOptions, QueryOptions, SORT_OPTIONS, ORDER_OPTIONS, Repository } from '../../types';
import { GithubService } from '../../services';
import { RepositoryDataSource } from './datasource';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
const PER_PAGE = 10
@Component({
  selector: 'app-github-container',
  templateUrl: './github-container.component.html',
  styleUrls: ['./github-container.component.css']
})
export class GithubContainerComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  items: Repository[] = [];
  queryOptions: QueryOptions;
  fetched_pages: Set<number> = new Set();
  dataSource: RepositoryDataSource;
  constructor(private readonly githubService: GithubService) {
  }

  ngOnInit() {
    this.dataSource = new RepositoryDataSource(this.githubService)
  }

  ngAfterViewInit() {

  }

  filterChange(filterOptions: FilterOptions) {
    this.queryOptions = {
      q: `created:${filterOptions.startDate}..${filterOptions.endDate}${filterOptions.lang ? '+language=' + filterOptions.lang : ''}`,
      sort: SORT_OPTIONS.STARS,
      order: ORDER_OPTIONS.DESC,
      per_page: PER_PAGE
    }
    this.dataSource.applyFilter(this.queryOptions);
    if (this.viewport) {
      this.viewport.scrollToIndex(0);
    }
  }



}
