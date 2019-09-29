const shadeCategories = [{id: 1, title: 'Light'}, {id: 2, title: 'Medium'}, {id: 3, title: 'Tan'}, {id: 4, title: 'Deep'}, {id: 5, title: 'Dark'}, {id: 6, title: 'No Group'}]

export function findShadeCategory(c){
  return shadeCategories.find( ({ id }) => id === Number(c.group) ).title
}

export const shadeCategoryLookup = {1: 'Light', 2: 'Medium', 3: 'Tan', 4: 'Deep', 5: 'Dark', 6: 'No Group'}

export default shadeCategories