import {
  NewsResponse,
  QueryNewsPayload,
} from "../../types/NewsListing/listing.d";
import { makeGetRequest } from "../fetchHelper";

export const newsList = async (pageNumber: Number) => {
  try {
    const baseUrl = process.env.REACT_APP_API_DOMAIN;
    let url = `${baseUrl}topheadlines?page=${pageNumber}`;
    const response: NewsResponse = await makeGetRequest(url);
    return response;
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export const queriedNews = async (payload: QueryNewsPayload) => {
  try {
    const baseUrl = process.env.REACT_APP_API_DOMAIN;
    const { startDate, endDate, qInTitle, page } = payload;
    let url = `${baseUrl}everything?to=${endDate}&from=${startDate}&page=${page}`;
    if (qInTitle) {
      url += `&qInTitle=${qInTitle}`;
    }
    const reponse: NewsResponse = await makeGetRequest(url);
    return reponse;
  } catch (e) {
    return Promise.reject(e.message);
  }
};
