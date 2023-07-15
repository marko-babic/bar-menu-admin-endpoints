import { ItemTranslation } from "../../infrastructure/database/itemTranslation.js";
import { Item } from "../../infrastructure/database/item.js";
import { PriceAndQuantity } from "../../infrastructure/database/priceAndQuantity.js";
import { ItemGetTransformerService } from "../../domain/services/itemGetTransformerService.js";


export const GetItemsUseCase = {
    run: async () => {
        const [itemTranslations, items, quantities] = await Promise.all([
            ItemTranslation.all(),
            Item.all(),
            PriceAndQuantity.all()
        ]);

        const response = ItemGetTransformerService.fromItemsAndTranslations(items.Items, itemTranslations.Items, quantities.Items);

        return response.sort((firstItem, secondItem) => firstItem.index - secondItem.index);
    }
}