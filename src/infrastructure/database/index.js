import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { Client } from './client.js'
import { DbTables } from "./dbTables.js";
import { marshall } from '@aws-sdk/util-dynamodb';

export const Index = {
     name: DbTables.indices,

     getNextItemId: async (table) => {
          const key = marshall({ table: table });

          let command = new GetItemCommand({
               TableName: Index.name,
               Key: key
          }
          );

          return await Client.send(command);
     },

     updateNextItemId: async (item) => {
          item = marshall(item);

          let command = new PutItemCommand({
               TableName: Index.name,
               Item: item
          });

          return await Client.send(command);
     }
}