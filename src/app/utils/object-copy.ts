import { isNullOrUndefined } from './is-null-or-undefined';

export function objectCopy<T>(object: T): T {
  if (isNullOrUndefined(object)) {
    return object;
  }
  const jsonWithObject = JSON.stringify(object);
  return JSON.parse(jsonWithObject);
}
