import { isString, mapValues, trim } from "lodash";

export const trimObjectStrings = <T extends Record<string, unknown>>(obj: T): T => {
  return mapValues(obj, (value) =>
    isString(value) ? trim(value) : value
  ) as T;
}