import { ItemCreateTransformerService } from '../../domain/services/itemCreateTransformerService.js';
import { GetItemUseCase } from './getItemUseCase.js';
import { DbTables } from '../../infrastructure/database/dbTables.js';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Item } from '../../infrastructure/database/item.js';
import { ItemTranslation } from '../../infrastructure/database/itemTranslation.js';
import { PriceAndQuantity } from '../../infrastructure/database/priceAndQuantity.js';
import { Index } from '../../infrastructure/database/index.js';

export const PatchItemUseCase = {
    run: async (content) => {
        let item = ItemCreateTransformerService.getItemData(content);
        let pricesAndQuantities = ItemCreateTransformerService.getPricesAndQuotitiesData(item.id, content.pricesAndQuantities);
        let translations = ItemCreateTransformerService.getTranslations(item.id, content.translations);

        await Item.create(item);

        const createTranslations = translations.map((translation) => ItemTranslation.create(translation));
        await Promise.all(createTranslations);

        for (let i = 0; i < pricesAndQuantities.length; i++) {
            if (pricesAndQuantities[i].id === null) {
                let nextPrice = await Index.getNextItemId(DbTables.pricesAndQuantities);
                nextPrice = unmarshall(nextPrice.Item);
                pricesAndQuantities[i].id = nextPrice.id;
                Index.updateNextItemId({ table: DbTables.pricesAndQuantities, id: nextPrice.id + 1 })
            }

            await PriceAndQuantity.create(pricesAndQuantities[i]);
        }

        return GetItemUseCase.run(item.id);
    }
}