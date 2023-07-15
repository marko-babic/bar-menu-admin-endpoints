import { ItemTranslation } from "../../infrastructure/database/itemTranslation.js";
import { Item } from "../../infrastructure/database/item.js";
import { PriceAndQuantity } from "../../infrastructure/database/priceAndQuantity.js";
import { ItemGetTransformerService } from "../../domain/services/itemGetTransformerService.js";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const GetCategoryItemsUseCase = {
    run: async (id) => {
        const [categoryItemTranslations, categoryItems, categoryItemQuantities] = await Promise.all([
            ItemTranslation.all(),
            Item.all(),
            PriceAndQuantity.all()
        ]);

        const filteredItems = categoryItems.Items.filter((item) => {
            item = unmarshall(item);

            return item.category_id === id;
        });

        let response = ItemGetTransformerService.fromItemsAndTranslations(filteredItems, categoryItemTranslations.Items, categoryItemQuantities.Items);

        response.sort((firstItem, secondItem) => firstItem.index - secondItem.index);

        return response;
    }
}