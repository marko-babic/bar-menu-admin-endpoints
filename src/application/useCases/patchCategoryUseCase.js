import { CategoryCreateTransformerService } from '../../domain/services/categoryCreateTransformerService.js';
import { GetCategoryUseCase } from './getCategoryUseCase.js';
import { Category } from '../../infrastructure/database/category.js';
import { CategoryTranslation } from '../../infrastructure/database/categoryTranslation.js';

export const PatchCategoryUseCase = {
    run: async (content) => {
        let category = CategoryCreateTransformerService.getCategoryData(content);
        let translations = CategoryCreateTransformerService.getTranslations(category.id, content.translations);

        await Category.create(category);

        await Promise.all(translations.map((translation) => CategoryTranslation.create(translation)));

        return GetCategoryUseCase.run(category.id);
    }
}