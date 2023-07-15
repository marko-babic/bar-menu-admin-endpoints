import { CategoryTranslation } from "../../infrastructure/database/categoryTranslation.js";
import { Category } from "../../infrastructure/database/category.js";
import { CategoryGetTransformerService } from "../../domain/services/categoryGetTransformerService.js";


export const GetCategoriesUseCase = {
    run: async () => {
        const [categoriesTranslations, categories] = await Promise.all([
            CategoryTranslation.all(),
            Category.all()
        ])

        let response = CategoryGetTransformerService.fromCategoriesAndTranslations(categories.Items, categoriesTranslations.Items);

        response.sort((firstCategory, secondCategory) => firstCategory.index - secondCategory.index);

        return response;
    }
}