import { ScanCommand, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { Client } from './client.js'
import { DbTables } from "./dbTables.js";
import { marshall } from '@aws-sdk/util-dynamodb';

export const ItemTranslation = {
    name: DbTables.itemsTranslations,

    all: async () => {
        const command = new ScanCommand({ TableName: ItemTranslation.name });
        return Client.send(command);
    },

    findByItemId: async (id) => {
        const expression = marshall({ ":itemId": id });

        const command = new QueryCommand({
            TableName: ItemTranslation.name,
            KeyConditionExpression: "item_id = :itemId",
            ExpressionAttributeValues: expression,
        });
        return Client.send(command);
    },

    create: async (item) => {
        item = marshall(item);

        const command = new PutItemCommand({
            TableName: ItemTranslation.name,
            Item: item
        });

        return Client.send(command);
    },
}