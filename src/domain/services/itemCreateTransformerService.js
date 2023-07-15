export const ItemCreateTransformerService = {
    getItemData: (body, nextItemId) => {
        return {
            id: body.id === null ? nextItemId : parseInt(body.id),
            category_id: body.categoryId,
            subcategory_id: body.subcategoryId,
            index: body.index,
            show: body.show,
        }
    },
    getPricesAndQuotitiesData: (itemId, pricesAndQuantities) => {
        return pricesAndQuantities.map((item) => {
            return {
                item_id: itemId,
                price: item.price,
                quantity: item.quantity,
                id: item.id ?? null,
            }
        });
    },
    getTranslations: (itemId, translations) => {
        return Object.keys(translations).map((key) => {
            return {
                item_id: itemId,
                description: translations[key].description,
                description_mini: translations[key].descriptionMini,
                language: key,
                name: translations[key].name,
            }
        });
    }
}