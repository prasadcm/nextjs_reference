import 'reflect-metadata';
import { container } from 'tsyringe';
import { SearchService } from './services/searchService';

// Register all services
export function registerDependencies(): void {
    container.registerSingleton(SearchService);
}
