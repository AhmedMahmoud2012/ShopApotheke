import { environment } from 'src/environments/environment';
import { QueryOptions } from '../types';

export class QueryBuilder {

    static search_urn = 'search/repositories'
    static buildSearchQuery(queryOptions: QueryOptions): string {
        const uri = `${environment.github_endpoint}/${QueryBuilder.search_urn}?`;
        const parts = [];
        for (let option in queryOptions) {
            if (queryOptions[option]) {
                parts.push(`${option}=${queryOptions[option]}`)
            }
        }
        return `${uri}${parts.join('&')}`;
    }
}