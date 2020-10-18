/**
 * Next.js uses an App component to pass down classes to the other files in your app.
 * This saves you from having to add imports to each file. You’ll set up an _app.js
 * file that passes down the Polaris components, styles, and everything else typically found in an index file.
 */

import App from "next/app";
import Head from "next/head";
/**
 * The Polaris app provider component passes down the props and context needed
 * to use the Polaris library. Your app needs to be wrapped in this component to use Polaris.
 */
import { AppProvider } from "@shopify/polaris";
/**
 * Since you’ll need Polaris styles to extend across your entire app,
 * they can also be passed down by the Next.js App component.
 */
import "@shopify/polaris/dist/styles.css";
/**
 * The translation prop is now required on the AppProvider.
 * Translations are provided in the locales folder. When using Polaris,
 * you are able to import translations from all languages supported by
 * the core Shopify product and consume them through the i18n prop.
 */
import translations from "@shopify/polaris/locales/en.json";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";

class MyApp extends App {
  render() {
    const { SHOPIFY_API_KEY } = process.env;
    const { Component, pageProps } = this.props;
    const config = {
      apiKey: API_KEY,
      shopOrigin: Cookies.get("shopOrigin"),
      forceRedirect: true,
    };
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <Component {...pageProps} />
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default MyApp;
