const camelcaseToUnderscore = (value: string) =>
  value
    .replace(/\.?([A-Z])/g, (_substring, memo) => '_' + memo.toLowerCase())
    .replace(/^_/, '');

const getUpdateParams = (data: Record<string, unknown>) =>
  Object.keys(data).map(key => ({
    Name: camelcaseToUnderscore(key),
    Value: `${data[key]}`,
  }));

export default getUpdateParams;
