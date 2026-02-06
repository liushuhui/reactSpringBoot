export const isFunction = (value: unknown): value is (...args: any) => any => typeof value === 'function';

export const getDictLabel = (dictData: any, key: string, value: string) => dictData?.[key]?.find((item: any) => item.value === value)?.label ?? '-';
