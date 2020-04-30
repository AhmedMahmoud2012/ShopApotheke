import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Repository, QueryOptions } from '../../types';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { GithubService } from '../../services';
import { QueryBuilder } from '../../helpers';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

export class RepositoryDataSource extends DataSource<Repository | undefined> {
    private cachedRepositories = Array.from<Repository>({ length: 0 });
    private dataStream = new BehaviorSubject<(Repository | undefined)[]>(this.cachedRepositories);
    private subscription = new Subscription();
    private pageSize = 10;
    private lastPage = 0;
    queryOptions: QueryOptions
    constructor(private githubService: GithubService) {
        super();
    }

    applyFilter(queryOptions: QueryOptions) {
        this.queryOptions = queryOptions;
        this.lastPage = 0;
        this._fetchFactPage();
    }

    connect(collectionViewer: CollectionViewer): Observable<(Repository | undefined)[] | ReadonlyArray<Repository | undefined>> {
        this.subscription.add(collectionViewer.viewChange.subscribe(range => {
            let currentPage = this._getPageForIndex(range.end);
            if (currentPage && range) {
                console.log(currentPage, this.lastPage);
            }
            if (currentPage > this.lastPage) {
                this.lastPage = currentPage;
                this._fetchFactPage(currentPage);
            }
        }));
        return this.dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subscription.unsubscribe();
    }

    private _fetchFactPage(page = 1): void {
        this.queryOptions.page = page;
        const uri = QueryBuilder.buildSearchQuery(this.queryOptions)
        this.githubService.getDate(uri).subscribe(({ items }) => {
            this.cachedRepositories.splice((page - 1) * this.pageSize, this.pageSize, ...items);
            this.dataStream.next(this.cachedRepositories);
        });
    }

    private _getPageForIndex(i: number): number {
        return Math.floor(i / this.pageSize) + 1;
    }
}