import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import {
  newsList,
  queriedNews,
} from "../../services/News/newsListingApiHelper";
import {
  NewsResponse,
  QueryNewsPayload,
} from "../../types/NewsListing/listing.d";
import { NewsListing } from "../../components/NewsListing/listing";
import "./style.css";
import { StoreContext } from "../../store/storeContext";

const icons = {
  refresh: require("../../assets/icons/reload.png").default, // .default used because of https://github.com/facebook/create-react-app/issues/9992
};

const ListingScreen = () => {
  const history = useHistory();
  const context = useContext(StoreContext);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [news, setNews] = useState([]);
  const [value, setValue] = useState("");
  const [showQueriedNews, setShowQueriedNews] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!showQueriedNews && news.length === 0) {
      getNewsList();
    }
  }, [showQueriedNews, news]);

  useEffect(() => {
    if (showQueriedNews && news.length === 0) {
      getQueriedNewsList();
    }
  }, [showQueriedNews, news]);

  const resetState = () => {
    setHasMore(true);
    setNews([]);
    setPage(1);
    setTotalResults(0);
    setError("");
  };

  const getNewsList = () => {
    newsList(page)
      .then((data: NewsResponse) => setNewsVitals(data))
      .catch((err) => setError(err));
  };

  const setNewsVitals = (data: NewsResponse) => {
    setNews((prevNews) => prevNews.concat(data.articles));
    setTotalResults(data.totalResults);
    setPage((prevPage) => prevPage + 1);
  };

  const getQueriedNewsList = () => {
    const date = moment().format("YYYY-MM-DD");
    const payload: QueryNewsPayload = {
      startDate: date,
      endDate: date,
      qInTitle: value,
      page,
    };

    queriedNews(payload)
      .then((data: NewsResponse) => setNewsVitals(data))
      .catch((err) => setError(err));
  };

  const getMoreDataNewsListing = () => {
    if (totalResults === undefined) return;
    if (news.length === totalResults) {
      setHasMore(false);
      return;
    }
    getNewsList();
  };

  const getMoreDataQueriedNews = () => {
    if (totalResults === undefined) return;
    if (news.length === totalResults) {
      setHasMore(false);
      return;
    }
    getQueriedNewsList();
  };

  const getMoreData = () => {
    showQueriedNews ? getMoreDataQueriedNews() : getMoreDataNewsListing();
  };

  const handleTextChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmitSearch = (event) => {
    event.preventDefault();

    const val = value.trim();
    if (!val) {
      alert("Enter something to begin search!");
      return;
    }
    resetState();
    setShowQueriedNews(true);
  };

  const onClickReload = () => {
    resetState();
    setValue("");
    setShowQueriedNews(false);
  };

  const onNewsClick = (current: NewsArticle) => {
    const { actions } = context;
    actions.setCurrentNewsData(current);
    history.push("/details");
  };

  return (
    <>
      <div className="headerContainer">
        <img
          src={icons.refresh}
          alt=""
          onClick={onClickReload}
          className="reload-icon"
        />
        <form className="formContainer" onSubmit={onSubmitSearch}>
          <input
            name="queryInput"
            type="text"
            placeholder="Enter text to search recent news on specific topics"
            value={value}
            onChange={handleTextChange}
            maxLength={100}
            className="queryInput"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="newsContainer">
        {error ? (
          <h3>{error}</h3>
        ) : (
          <NewsListing
            news={news}
            hasMore={hasMore}
            getMoreData={getMoreData}
            onClick={onNewsClick}
          />
        )}
      </div>
    </>
  );
};

export default ListingScreen;
