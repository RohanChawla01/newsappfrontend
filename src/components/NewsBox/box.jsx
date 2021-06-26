import React from "react";
import { useImageLoaded } from "../../customHooks/useImageLoaded";
import { NewsArticle } from "../../types/NewsListing/listing.d";
import { Loader } from "../Loader/loader";
import "./style.css";

interface Props {
  news: NewsArticle;
}

export const NewsBox = (props: Props) => {
  const { news } = props;
  const [ref, loaded, onLoad] = useImageLoaded();

  return (
    <div className="post">
      <div>
        <img
          ref={ref}
          src={news.urlToImage}
          alt="Could not Load!"
          className="postImage"
          onLoad={onLoad}
        />
        {!loaded ? <Loader /> : <React.Fragment />}
      </div>
      <div>
        <h3>{news.title}</h3>
        <p>{news.description}</p>
      </div>
    </div>
  );
};
