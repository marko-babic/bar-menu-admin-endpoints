import { PatchItemUseCase } from '../../../application/useCases/patchItemUseCase.js'
import { PatchCategoryUseCase } from '../../../application/useCases/patchCategoryUseCase.js'

export const PatchRouter = {
    route: async (path, id, content) => {
        let body;

        switch (path) {
            case "/categories/" + id:
                body = await PatchCategoryUseCase.run(content);
                break;
            case "/items/" + id:
                body = await PatchItemUseCase.run(content);
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }

        return body;
    }
}