import { CategoryCreateTransformerService } from '../../domain/services/categoryCreateTransformerService.js';
import { GetCategoryUseCase } from './getCategoryUseCase.js';
import { DbTables } from "../../infrastructure/database/dbTables.js";
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Category } from '../../infrastructure/database/category.js';
import { CategoryTranslation } from '../../infrastructure/database/categoryTranslation.js';
import { Index } from '../../infrastructure/database/index.js';

export const CreateCategoryUseCase = {
    run: async (content) => {
        const nextCategoryId = await CreateCategoryUseCase.getNextCategoryId()
        let category = CategoryCreateTransformerService.getCategoryData(content, nextCategoryId);
        let translations = CategoryCreateTransformerService.getTranslations(category.id, content.translations);

        await Category.create(category);
        // tood: batch write
        await Promise.all(translations.map((translation) => CategoryTranslation.create(translation)));

        if (nextCategoryId === category.id) {
            await Index.updateNextItemId({ table: DbTables.categories, id: nextCategoryId + 1 });
        }

        return GetCategoryUseCase.run(category.id);
    },

    getNextCategoryId: async () => {
        let nextCategory = await Index.getNextItemId(DbTables.categories);
        nextCategory = unmarshall(nextCategory.Item);

        return nextCategory.id;
    },
}