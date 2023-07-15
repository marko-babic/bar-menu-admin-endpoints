export const CategoryCreateTransformerService = {
    getCategoryData: (body, nextItemId) => {
        return {
            id: body.id === null ? nextItemId : parseInt(body.id),
            category: body.category,
            index: body.index,
            show: body.show,
            style: body.style,
        }
    },
    getTranslations: (categoryId, translations) => {
        return Object.keys(translations).map((key) => {
            return {
                category_id: categoryId,
                language: key,
                name: translations[key].name,
            }
        });
    }
}