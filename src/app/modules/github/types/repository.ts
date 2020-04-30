export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    url: string;
}

export interface RepositoryResponse {
    total_count: number;
    items: Repository[]
}

export interface Language {
    label: string;
    name: string;
}