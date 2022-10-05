import React from "react";
import "../styles/globals.css";
import "react-multi-carousel/lib/styles.css";
import Header from "../components/Header/Header";
import MetaTags from "../components/common/MetaTags";
import Provider from "../context/provider/Provider";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <div className='bg-gray-50 min-h-screen'>
        <MetaTags />
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
