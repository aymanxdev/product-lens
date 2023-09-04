import { Types } from 'mongoose';

export const deleteItemFrom = <T>(items: T[], itemToDelete: T) => {
  return items.filter((item: T) => item !== itemToDelete);
};


export const isEqual= (id1: Types.ObjectId | string, id2: Types.ObjectId | string): boolean => {
  return id1.toString() === id2.toString();
}
export const convertToMilliseconds = (time: string) => {
  const units: { [key: string]: number } = {
    'm': 60 * 1000,
    'h': 60 * 60 * 1000,
    'd': 24 * 60 * 60 * 1000,
    's': 1000
  };

  const unit = time.slice(-1);
  const value = parseInt(time.slice(0, -1), 10);

  return value * (units[unit] || 0);
};