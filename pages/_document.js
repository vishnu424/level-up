import Document, { Html, Head, Main, NextScript } from "next/document";
// import Script from "next/script";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="facebook-domain-verification"
            content="3cfuu276h3ubbal90v0yu6ice1ymrh"
          />
          <script
            src="https://cdn.jwplayer.com/libraries/5QopjvDu.js"
            crossorigin
          ></script>

          <script>
            {process.browser &&
              (window.fbAsyncInit = (function () {
                FB.init({
                  appId: `499255922103866`,
                  cookie: true,
                  xfbml: true,
                  version: `v14.0`,
                });

                FB.AppEvents.logPageView();
              })(
                (function (d, s, id) {
                  var js,
                    fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {
                    return;
                  }
                  js = d.createElement(s);
                  js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                })(document, "script", "facebook-jssdk")
              ))}
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />

          <div id="modal-root"></div>
        </body>

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
          integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ=="
          crossorigin="anonymous"
          defer
        ></script>
        <script defer src="https://apis.google.com/js/api.js"></script>
      </Html>
    );
  }
}

export default MyDocument;
