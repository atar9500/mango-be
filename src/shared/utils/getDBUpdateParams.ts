import {DynamoDB} from 'aws-sdk';

type UpdateParams = Pick<
  DynamoDB.DocumentClient.UpdateItemInput,
  | 'ConditionExpression'
  | 'Key'
  | 'UpdateExpression'
  | 'ExpressionAttributeNames'
  | 'ExpressionAttributeValues'
>;

const getDBUpdateParams = (
  params: Record<string, unknown>,
  keys: Record<string, unknown>,
): UpdateParams => ({
  ConditionExpression: Object.keys(keys)
    .reduce((memo, key) => `${memo}#${key} = :${key} AND `, '')
    .slice(0, -5),
  Key: keys,
  UpdateExpression: `set ${Object.entries(params)
    .map(([key]) => `#${key} = :${key}, `)
    .reduce((acc, str) => acc + str)
    .slice(0, -2)}`,
  ExpressionAttributeNames: Object.keys({...params, ...keys}).reduce(
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

export default getDBUpdateParams;
