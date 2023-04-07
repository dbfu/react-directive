export const directiveMap = new Map();

export const directive = (name, hanlde) => {
  if (name) {
    directiveMap.set(name, hanlde)
  }
}
