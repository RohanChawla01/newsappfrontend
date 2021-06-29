import React from "react";
import { Route } from "react-router-dom";

import ListingScreen from "../../screens/Listing/listing";
import DetailsScreen from "../../screens/Details/details";

export const Routing = () => {
  return (
    <>
      <Route path="/" component={ListingScreen} exact />
      <Route path="/details" component={DetailsScreen} exact />
    </>
  );
};
