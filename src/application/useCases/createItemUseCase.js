import { ItemCreateTransformerService } from '../../domain/services/itemCreateTransformerService.js';
import { GetItemUseCase } from './getItemUseCase.js';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { DbTables } from "../../infrastructure/database/dbTables.js";
import { Item } from "../../infrastructure/database/item.js";
import { ItemTranslation } from "../../infrastructure/database/itemTranslation.js";
import { PriceAndQuantity } from "../../infrastructure/database/priceAndQuantity.js";
import { Index } from "../../infrastructure/database/index.js";


export const CreateItemUseCase = {
    run: async (content) => {
        const nextItemId = await CreateItemUseCase.getNextItemId();
        let item = ItemCreateTransformerService.getItemData(content, nextItemId);
        let pricesAndQuantities = ItemCreateTransformerService.getPricesAndQuotitiesData(item.id, content.pricesAndQuantities);
        let translations = ItemCreateTransformerService.getTranslations(item.id, content.translations);

        await Item.create(item);

        const createPricesAndQuantities = pricesAndQuantities.map(async (priceAndQuantity) => {
            let nextPrice = await Index.getNextItemId(DbTables.pricesAndQuantities);
            nextPrice = unmarshall(nextPrice.Item);
            priceAndQuantity.id = nextPrice.id;
            await PriceAndQuantity.create(priceAndQuantity);
            await Index.updateNextItemId({ table: DbTables.pricesAndQuantities, id: nextPrice.id + 1 });
        });

        await Promise.all(createPricesAndQuantities);

        const createTranslations = translations.map((translation) => ItemTranslation.create(translation));
        await Promise.all(createTranslations);

        if (nextItemId === item.id) {
            await Index.updateNextItemId({ table: DbTables.items, id: item.id + 1 });
        }

        return GetItemUseCase.run(item.id);
    },

    getNextItemId: async () => {
        let nextItem = await Index.getNextItemId(DbTables.items);
        nextItem = unmarshall(nextItem.Item);

        return nextItem.id;
    }
}