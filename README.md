# DropCopy UI

An implementation of a UI for the OpenBook DEX.

### Running the UI

Run `yarn` to install dependencies, then run `yarn start` to start a development server or `yarn build` to create a production build that can be served by a static file server. Note that prior to compiling you need to add charts yourself (see below).

### Collect referral fees

If you are hosting a public UI using this codebase, you can collect referral fees when your users trade through your site.

To do so, set the `REACT_APP_USDT_REFERRAL_FEES_ADDRESS` and `REACT_APP_USDC_REFERRAL_FEES_ADDRESS` environment variables to the addresses of your USDT and USDC SPL token accounts.

You may want to put these in local environment files (e.g. `.env.development.local`, `.env.production.local`). See the [documentation](https://create-react-app.dev/docs/adding-custom-environment-variables) on environment variables for more information.

NOTE: remember to re-build your app before deploying for your referral addresses to be reflected.

### Add Trading View charts

It is now required to add OHLCV candles built from DropCopy data server:

1. Get access to the [TradingView Charting Library](https://github.com/tradingview/charting_library/) repository. This is a **private repository** and it will **return a 404 if you don't have access to it**. To get access to the repository please refer to [TradingView's website](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/)

2. Once you have access to the Charting Library repository:

- Copy `charting_library` folder from https://github.com/tradingview/charting_library/ to `/public` and to `/src` folders.
- Copy `datafeeds` folder from https://github.com/tradingview/charting_library/ to `/public`.

---

See the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for other commands and options.

---

See [A technical introduction to the OpenBook DEX](https://docs.google.com/document/d/1isGJES4jzQutI0GtQGuqtrBUqeHxl_xJNXdtOv4SdII/view) to learn more about the OpenBook DEX.

See [OpenBook-ts](https://github.com/openbook-dex/openbook-ts) for DEX client-side code. DropCopy UI uses this library.

See [sol-wallet-adapter](https://github.com/anza-xyz/wallet-adapter) for an explanation of how the DropCopy UI interacts with wallet services to sign and send requests to the OpenBook DEX.

