import { types } from "../constants";
import { NewsArticle } from "../../types/NewsListing/listing.d";

export const useActions = (
  state: any,
  dispatch: ({ type: any, payload: any }) => void
) => {
  const setCurrentNewsData = (data: NewsArticle) => {
    dispatch({ type: types.SET_CURRENT_NEWS_DATA, payload: data });
  };
  return { setCurrentNewsData };
};
