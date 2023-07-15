import { unmarshall } from "@aws-sdk/util-dynamodb";

export const ItemGetTransformerService = {
    fromItemsAndTranslations: (items, translations, quantities) => {
        let returnData = []

        items.forEach((item) => {
            item = unmarshall(item);

            item.translations = {};
            item.subcategoryId = item.subcategory_id;
            item.categoryId = item.category_id;
            translations.forEach((translation) => {
                translation = unmarshall(translation);

                if (translation.item_id === item.id) {
                    item.translations[translation.language] = {
                        item_id: translation.item_id,
                        name: translation.name,
                        description: translation.description,
                        language: translation.language,
                        descriptionMini: translation.description_mini,
                    }
                }
            })

            let itemQuantities = quantities.map((quantity) => {
                return unmarshall(quantity);
            }).filter((quantity) => {
                return quantity.item_id === item.id;
            })

            item.pricesAndQuantities = itemQuantities;

            returnData.push(item)
        })

        return returnData;
    },
    fromItemAndTranslations: (item, translations, quantityAndPrice) => {
        item = unmarshall(item);

        let body = {
            id: item.id,
            index: item.index,
            categoryId: item.category_id,
            subcategoryId: item.subcategory_id,
            show: item.show,
            translations: {},
            pricesAndQuantities: quantityAndPrice.map((item) => {
                return unmarshall(item);
            }),
        }

        translations.forEach((item) => {
            item = unmarshall(item);

            body.translations[item.language] = {
                descriptionMini: item.description_mini,
                description: item.description,
                name: item.name,
            };
        })

        return body;
    }
}