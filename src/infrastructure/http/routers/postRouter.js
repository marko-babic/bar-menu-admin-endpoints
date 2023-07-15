import { CreateItemUseCase } from '../../../application/useCases/createItemUseCase.js';
import { CreateCategoryUseCase } from '../../../application/useCases/createCategoryUseCase.js';

export const PostRouter = {
    route: async (path, id, content) => {
        let body;

        switch (path) {
            case "/items":
                body = await CreateItemUseCase.run(content);
                break;
            case "/categories":
                body = await CreateCategoryUseCase.run(content);
                break;
            case "/items/" + id:

                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }

        return body;
    }
}