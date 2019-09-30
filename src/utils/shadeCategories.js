const shadeCategories = [{id: 1, title: 'Light: Fenty 100-190'}, {id: 2, title: 'Medium: Fenty 200-290'}, {id: 3, title: 'Tan: Fenty 300-390'}, {id: 4, title: 'Deep: Fenty 400-498'}, {id: 5, title: 'No Group'}]

export function findShadeCategory(c){
  return shadeCategories.find( ({ id }) => id === Number(c.group) ).title
}

export const shadeCategoryLookup = {1: 'Light: Fenty 100-190', 2: 'Medium: Fenty 200-290', 3: 'Tan: Fenty 300-390', 4: 'Deep: Fenty 400-498', 5: 'No Group'}

export default shadeCategories