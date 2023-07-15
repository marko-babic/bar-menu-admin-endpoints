import { CategoryGetTransformerService } from '../../domain/services/categoryGetTransformerService.js';
import { Category } from '../../infrastructure/database/category.js';
import { CategoryTranslation } from '../../infrastructure/database/categoryTranslation.js';

export const GetCategoryUseCase = {
    run: async (id) => {
        const [category, translations] = await Promise.all([
            Category.find(id),
            CategoryTranslation.findByCategoryId(id)
        ]);

        return CategoryGetTransformerService.fromCategoryAndTranslations(category.Item, translations.Items);
    }
}
