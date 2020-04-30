import { RequestCacheEntry } from '../types';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/modules/github/';
import { Injectable } from '@angular/core';

const STARRED_REPO_COLLECTION_NAME = 'starred_repos';

@Injectable({
    providedIn: 'root'
})
export class DBService {

    constructor() {
        const starred_repos = localStorage.getItem(STARRED_REPO_COLLECTION_NAME);
        if (!starred_repos) {
            localStorage.setItem(STARRED_REPO_COLLECTION_NAME, JSON.stringify([]));
        }
    }

    starRepo(repo: Repository): boolean {
        try {
            const starred_repos = localStorage.getItem(STARRED_REPO_COLLECTION_NAME);
            if (starred_repos) {
                const arr = (JSON.parse(starred_repos) as Array<Repository>)
                arr.push(repo);
                localStorage.setItem(STARRED_REPO_COLLECTION_NAME, JSON.stringify(arr));
                return true;
            }
        } catch{
            return false;
        }
    }


    unStarRepo(repo: Repository): boolean {
        try {
            const starred_repos = localStorage.getItem(STARRED_REPO_COLLECTION_NAME);
            if (starred_repos) {
                const repos = (JSON.parse(starred_repos) as Array<Repository>);
                const repository = repos.find(r => r.id === repo.id)
                if (repository) {
                    localStorage.setItem(STARRED_REPO_COLLECTION_NAME, JSON.stringify(repos.filter(r => r.id !== repo.id)));
                    return true;
                }
                throw new Error(`404`);
            }
        } catch{
            return false;
        }
    }

    getStarRepo(): Array<Repository> {
        const starred_repos = localStorage.getItem(STARRED_REPO_COLLECTION_NAME);
        if (starred_repos) {
            return (JSON.parse(starred_repos) as Array<Repository>)
        }
        return [];
    }

    getStarRepoIds(): Array<number> {
        const starred_repos = localStorage.getItem(STARRED_REPO_COLLECTION_NAME);
        if (starred_repos) {
            return (JSON.parse(starred_repos) as Array<Repository>).map(repo => repo.id)
        }
        return [];
    }

    static get(key: string): RequestCacheEntry {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) as RequestCacheEntry : null
    }

    static set(key: string, entry: RequestCacheEntry) {
        localStorage.setItem(key, JSON.stringify(entry))
    }

    static delete(key) {
        localStorage.removeItem(key);
    }

    static allStorage() {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while (i--) {
            const item = localStorage.getItem(keys[i]);
            if (item && item.indexOf(environment.github_endpoint) >= 0) {
                values.push(JSON.parse(item));
            }
        }
        return values;
    }
}