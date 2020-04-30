import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { SORT_OPTIONS, ORDER_OPTIONS } from '../types';
import { QueryBuilder } from '../helpers';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GithubService', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })
    injector = getTestBed();
    service = injector.get(GithubService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: GithubService = TestBed.get(GithubService);
    expect(service).toBeTruthy();
  });

  it('GetDate should return Observer of RespoistoryResponse', () => {

    const queryOptions = {
      q: `created:`,
      sort: SORT_OPTIONS.STARS,
      order: ORDER_OPTIONS.DESC,
      per_page: 10
    }
    const dummyData = {
      total_count: 1,
      items: [{
        id: 1,
        name: 'test',
        full_name: 'test',
        description: 'test',
        url: 'test'
      }]
    }
    const url = QueryBuilder.buildSearchQuery(queryOptions);
    service.getDate(url).subscribe(result => {
      expect(result.items.length).toBe(1);
      expect(result).toEqual(dummyData);
    });
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
