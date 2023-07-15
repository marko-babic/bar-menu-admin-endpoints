import { ScanCommand, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { Client } from './client.js'
import { DbTables } from "./dbTables.js";
import { marshall } from '@aws-sdk/util-dynamodb';

export const Category = {
    name: DbTables.categories,

    all: async () => {
        const command = new ScanCommand({ TableName: Category.name });
        return Client.send(command);
    },

    find: async (id) => {
        const key = marshall({ id: id })

        const command = new GetItemCommand({
            TableName: Category.name,
            Key: key,
        });

        return Client.send(command);
    },
    create: async (category) => {
        category = marshall(category);

        const command = new PutItemCommand({
            TableName: Category.name,
            Item: category
        });

        return Client.send(command);
    },
}