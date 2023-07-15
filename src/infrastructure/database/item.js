import { ScanCommand, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { Client } from './client.js'
import { DbTables } from "./dbTables.js";
import { marshall } from '@aws-sdk/util-dynamodb';

export const Item = {
	name: DbTables.items,

	all: async () => {
		const command = new ScanCommand({ TableName: Item.name });
		return Client.send(command);
	},
	find: async (id) => {
		const key = marshall({ id: id });
		const command = new GetItemCommand({
			TableName: Item.name,
			Key: key,
		});
		return Client.send(command);
	},
	create: async (item) => {
		item = marshall(item);

		const command = new PutItemCommand({
			TableName: Item.name,
			Item: item
		});

		return Client.send(command);
	},
}