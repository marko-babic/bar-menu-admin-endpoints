import { GetCategoriesUseCase } from '../../../application/useCases/getCategoriesUseCase.js';
import { GetCategoryItemsUseCase } from '../../../application/useCases/getCategoryItemsUseCase.js';
import { GetItemsUseCase } from '../../../application/useCases/getItemsUseCase.js';
import { GetItemUseCase } from '../../../application/useCases/getItemUseCase.js';

export const GetRouter = {
    route: async (path, id) => {
        let body;

        switch (path) {
            case '/categories':
                try {
                    body = await GetCategoriesUseCase.run();
                } catch (error) {
                    body = error;
                }
                break;
            case '/category/items/' + id:
                try {
                    body = await GetCategoryItemsUseCase.run(id);
                } catch (error) {
                    body = error;
                }
                break;
            case "/items":
                try {
                    body = await GetItemsUseCase.run();

                } catch (error) {
                    body = error;
                }

                break;
            case "/items/" + id:
                body = await GetItemUseCase.run(id);
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }

        return body;
    }
}