import { ADD_ITEM, CLEAR_ITEM, REMOVE_ITEM } from "./constants";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: {
    item: {
      ...item,
      product: item.product || item
    }
  }
})

export function removeItem(item){
  return {
    type: REMOVE_ITEM, 
    payload: {
      item: item
    }
  }
}

export function clearItem(){
  return {
    type: CLEAR_ITEM
  }
}