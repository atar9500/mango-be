export type AttributeListType = AttributeType[];

export interface AttributeType {
  Name: string;
  Value?: string;
}

export const parseAttributesList = (attributes: AttributeListType) =>
  attributes.reduce<Record<string, unknown>>(
    (memo, {Name, Value}) => ({...memo, [Name]: Value}),
    {},
  );
