import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { NewsResponse, NewsArticle } from "../../types/NewsListing/listing.d";

import { NewsBox } from "../../components/NewsBox/box";
import { Loader } from "../../components/Loader/loader";
import "./style.css";
import "../../common.css";

interface Props {
  hasMore: Boolean;
  getMoreData: () => void;
  news: NewsResponse[];
}

export const NewsListing = (props: Props) => {
  const { news, hasMore, getMoreData } = props;

  const renderEndMessage = () => (
    <h3 className="ta-c">No more news to load!</h3>
  );

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={getMoreData}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={renderEndMessage()}
    >
      {news &&
        news.map((current: NewsArticle, index) => (
          <NewsBox news={current} key={index} />
        ))}
    </InfiniteScroll>
  );
};
