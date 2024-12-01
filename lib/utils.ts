/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Types } from 'mongoose';

export function convertDocumentToObject<T extends Document>(doc: T): Partial<T> {
  const obj = doc.toObject();
  return convertIdToString(obj);
}

function convertIdToString(item: any): any {
  if (item instanceof Types.ObjectId) {
    return item.toString();
  }

  if (Array.isArray(item)) {
    return item.map(convertIdToString);
  }

  if (typeof item === 'object' && item !== null) {
    const result: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(item)) {
      if (key === '_id') {
        result[key] = value instanceof Types.ObjectId ? value.toString() : value;
      } else {
        result[key] = convertIdToString(value);
      }
    }
    return result;
  }

  return item;
}
