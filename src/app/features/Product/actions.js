import { getProduct } from "../../api/product";
import { ERROR_FETCHING_PRODUCT, SET_CATEGORY, SET_KEYWORD, SET_PAGE, START_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT, TOGGLE_TAGS } from "./constants";
import debounce from 'debounce-promise';

export const startFetchingProduct = () => ({
  type: START_FETCHING_PRODUCT,
})

export const errorFetchingProduct = () => ({
  type: ERROR_FETCHING_PRODUCT,
})

export const successFethcingProduct = (payload) => ({
  type: SUCCESS_FETCHING_PRODUCT,
  payload
})

let debouncedFetchProducts = debounce(getProduct, 1000);

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProduct());
    let perPage = getState().products.perPage || 8;
    let currentPage = getState().products.currentPage || 1;
    let category = getState().products.category || '';
    let tags = getState().products.tags || [];
    let keyword = getState().products.keyword || '';

    const params = {
      limit: perPage,
      skip: ( currentPage * perPage ) - perPage,
      category: category,
      tags: tags,
      q: keyword
    }
    try {
      let { data: { data, count} } = await debouncedFetchProducts(params);
      dispatch(successFethcingProduct({data, count}));
    } catch (error) {
      console.log(error)
      dispatch(errorFetchingProduct());
    }
  }
}

export const setPage = (number = 1) => ({
  type: SET_PAGE,
  payload: {
    currentPage: number
  }
})

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: {
    category: category
  }
})

export const toggleTags = (tag) => ({
  type: TOGGLE_TAGS,
  payload: {
    tag: tag
  }
})

export const setKeyword = (keyword) => ({
  type: SET_KEYWORD,
  payload: {
    keyword: keyword
  }
})



