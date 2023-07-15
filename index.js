import { GetRouter } from './src/infrastructure/http/routers/getRouter.js';
import { PostRouter } from './src/infrastructure/http/routers/postRouter.js';
import { PatchRouter } from './src/infrastructure/http/routers/patchRouter.js';

export async function handler(event) {
    const id = event.pathParameters?.id ? parseInt(event.pathParameters.id) : 1
    let body = [];
    
    switch (event.requestContext.http.method) {
        case "GET":
            body = await GetRouter.route(event.rawPath, id)
            break;
        case "POST":
            const postBody = JSON.parse(event.body);
            body = await PostRouter.route(event.rawPath, id, postBody)
            break;
        case "PATCH":
            const patchBody = JSON.parse(event.body);
            body = await PatchRouter.route(event.rawPath, id, patchBody)
            break;
        default:
            throw new Error(`Unsupported route: "${event.routeKey}"`)
    }

    return body;
}

export default handler