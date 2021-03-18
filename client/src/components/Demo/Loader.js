import React from "react";
import Loader from "react-loader-spinner";

const wishlistLoader = () => {
  return <Loader type="ThreeDots" color="#152238" height={20} width={20} />;
};
// export default () => <Loader type="Puff" color="#00BFFF" />;

export default wishlistLoader;
