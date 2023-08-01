export const deleteItemFrom = <T>(items: T[], itemToDelete: T) => {
  return items.filter((item: T) => item !== itemToDelete);
};
