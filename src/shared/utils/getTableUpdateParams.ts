import {DynamoDB} from 'aws-sdk';

type UpdateParams = Pick<
  DynamoDB.DocumentClient.UpdateItemInput,
  | 'ConditionExpression'
  | 'Key'
  | 'UpdateExpression'
  | 'ExpressionAttributeNames'
  | 'ExpressionAttributeValues'
>;

const getTableUpdateParams = (
  params: Record<string, unknown>,
  keys: Record<string, unknown>,
): UpdateParams => ({
  ConditionExpression: Object.keys(keys).reduce(
    (memo, key) => `${memo ? ' AND' : ''}${key} = : ${key}`,
    '',
  ),
  Key: keys,
  UpdateExpression: `set ${Object.entries(params)
    .map(([key]) => `#${key} = :${key}, `)
    .reduce((acc, str) => acc + str)
    .slice(0, -2)}`,
  ExpressionAttributeNames: Object.keys(params).reduce(
    (acc, key) => ({
      ...acc,
      [`#${key}`]: key,
    }),
    {},
  ),
  ExpressionAttributeValues: Object.entries({...params, ...keys}).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`:${key}`]: value,
    }),
    {},
  ),
});

export default getTableUpdateParams;
