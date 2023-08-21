import { Types } from 'mongoose';

export const deleteItemFrom = <T>(items: T[], itemToDelete: T) => {
  return items.filter((item: T) => item !== itemToDelete);
};


export const isEqual= (id1: Types.ObjectId | string, id2: Types.ObjectId | string): boolean => {
  return id1.toString() === id2.toString();
}