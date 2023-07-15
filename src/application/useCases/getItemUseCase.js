import { Item } from '../../infrastructure/database/item.js'
import { ItemTranslation } from '../../infrastructure/database/itemTranslation.js'
import { ItemGetTransformerService } from '../../domain/services/itemGetTransformerService.js'
import { PriceAndQuantity } from '../../infrastructure/database/priceAndQuantity.js'

export const GetItemUseCase = {
    run: async (id) => {
        const [item, translations, quantityAndPrice] = await Promise.all([
            Item.find(id),
            ItemTranslation.findByItemId(id),
            PriceAndQuantity.findByItemId(id)
        ]);

        return ItemGetTransformerService.fromItemAndTranslations(item.Item, translations.Items, quantityAndPrice.Items);
    }
}