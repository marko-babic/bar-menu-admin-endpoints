import { ScanCommand, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { Client } from './client.js'
import { DbTables } from "./dbTables.js";
import { marshall } from '@aws-sdk/util-dynamodb';

export const CategoryTranslation = {
    name: DbTables.categoriesTranslations,

    all: async () => {
      const command = new ScanCommand({ TableName: CategoryTranslation.name });
      return Client.send(command);
    },

    findByCategoryId: async (id) => {
      const expression = marshall({ ":categoryId": id });

      const command = new QueryCommand({
        TableName: CategoryTranslation.name,
        KeyConditionExpression: "category_id = :categoryId",
        ExpressionAttributeValues: expression,
      });

      return Client.send(command);
    },

    create: async (categoryTranslations) => {
      categoryTranslations = marshall(categoryTranslations);

      const command = new PutItemCommand({
        TableName: CategoryTranslation.name,
        Item: categoryTranslations
      });

      return Client.send(command);
    },
}