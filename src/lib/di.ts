import 'reflect-metadata';
import { container } from 'tsyringe';
import { PreviouslySearchedService } from './services/previouslySearchedService';
import { SearchRecommendationService } from './services/searchRecommendationService';
import { SearchSuggestionService } from './services/searchSuggestionService';

// Register all services
export function registerDependencies(): void {
    container.registerSingleton('SearchRecommendationService', PreviouslySearchedService);
    container.registerSingleton('SearchRecommendationService', SearchRecommendationService);
    container.registerSingleton('SearchSuggestionService', SearchSuggestionService);
}
