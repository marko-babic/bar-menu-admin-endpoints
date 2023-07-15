import { unmarshall } from "@aws-sdk/util-dynamodb";

export const CategoryGetTransformerService = {
    fromCategoriesAndTranslations: (categories, translations) => {
        let returnData = []

        categories.forEach((category) => {
            category = unmarshall(category);
            category.translations = {};
            translations.forEach((translation) => {
                translation = unmarshall(translation);

                if (translation.category_id === category.id) {
                    category.translations[translation.language] = translation;
                }
            })

            returnData.push(category)
        });

        return returnData;
    },
    fromCategoryAndTranslations: (category, translations) => {
        category = unmarshall(category);

        let body = {
            id: category.id,
            category: category.category,
            index: category.index,
            style: category.style,
            show: category.show,
            translations: {},
        }

        translations.forEach((item) => {
            item = unmarshall(item);

            body.translations[item.language] = {
                name: item.name,
            };
        })

        return body;
    }
}