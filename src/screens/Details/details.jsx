import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { StoreContext } from "../../store/storeContext";
import "../../common.css";

const DetailsScreen = () => {
  const history = useHistory();
  const context = useContext(StoreContext);
  const {
    state: { currentNews },
  } = context;

  const onClick = () => history.goBack();

  const renderBackBtn = () => (
    <button name="GoBack" onClick={onClick}>
      Go Back
    </button>
  );

  const renderNoData = () => {
    return (
      <>
        <p>No Details!</p>
        {renderBackBtn()}
      </>
    );
  };

  const renderDetails = () => {
    const published = moment(currentNews.publishedAt).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    return (
      <>
        <h3>{currentNews.title}</h3>
        <span className="fs-12">
          {published} <b>|</b> By {currentNews.author}
        </span>
        <p>{currentNews.content}</p>
        {renderBackBtn()}
      </>
    );
  };

  const isDataAvailable = Object.keys(currentNews).length > 0;
  return (
    <div className="ta-c">
      {isDataAvailable ? renderDetails() : renderNoData()}
    </div>
  );
};

export default DetailsScreen;
