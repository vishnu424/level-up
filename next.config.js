const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports =
  // withCss(
  // withPurgeCss({
  //   purgeCss:
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            // cacheGroupKey here is `commons` as the key of the cacheGroup
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split("/")
                .reduceRight((item) => item);
              const allChunksNames = chunks.map((item) => item.name).join("~");
              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            chunks: "all",
          },
        },
      },
    },
    env: {
      ENV: process.env.ENV,
      PROD_BASE_URL: "https://api-v2.basidialearning.com",
      DEV_BASE_URL: "https://dev-v2.basidialearning.com",
      SPREADSHEET_ID1: "1Hatj9LmHGgWz5C302PeHx-jGj9u9J1ig4JbOX4ytUsU",
      SHEET_ID1: 0,
      CLIENT_EMAIL1: "basidiadlp@dlp-counsellor.iam.gserviceaccount.com",
      PRIVATE_KEY1:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0GZcOesQiHSYt\namlmd/LJzQegOv5p77lbPfm/jwfmqOuKCERZgro/I+6o3p0QFLPic4GmjlTrJZEJ\nWLtQo0HRqD1Q4UqifZjUHPLP4J/oUv0hKi5DADYKvtMyKWTw3TFuApfR+hU3AXgS\nO1jg7Mbav4CwFWcvPjVTJJnH1+syClfz3h5BhcxA/AD+qjSddDxwW4Fpz6HIsF80\nLh/MvmnVUZ0o4AoTbqYP195OWwrX3cDg2k8GqXwSiZ9+P7vwlyV6TA8fF8+/LFzn\n1L45eyeX4QjRNO0nlPLuO1fKf7vmkkXvjQcOb1ikDx+rKslnJjdf3/RDv7aXrCvl\nMeYk/H45AgMBAAECggEANwrZIVpA5kItYFT02JXRNH6+lWhiSAM1jZ6/3R08J3E5\n52pGZWrwPArhzmeW7gq9vXhayAoZBvLoxEgDm44BuC9oafco5cdn9W/Rf9nhVVJD\nvaaUE/MVESyoBF0lVf3sNPiC6PA7GqAOz9emfruuvL0peedYrVYgWwRFIZAqeBSv\nur1Waqv7i3e1+ssyeJuG0OayHE8A3uq62YHbDk2SBTnUUd/8fVuzc+mUVtognN/3\n+PZCr4z4Ofpvh5LQjh+VYZE0pFp75exp0/GCDVDqPzhh9ciTOdUoCpmtNbpUqTMW\nst4Gcn92uxOGu4Ubnwpyg01IxKbEemdLYXIuUYewpwKBgQD2G/fdboGsbpwtWIW6\nZs7V//sN3NeoSgo/0fGAEJYZRspuXt+HHRJE7p1LqrzNoZH+64C96ODtGfFwY8RS\nCSxvce+BQdqWaFpyQu8Ei45FEQ0AjitSL+Aac33HHGFAOpw1bdp+imA+1tdEhX8b\nQniHedQ7BCuXKpNMrwv3JD620wKBgQC7VoCSIALTAfl08m/yWjQJ6stg2Guy/rOy\n+9nOQ0JNDqx75SbRgsjunz5+T8SQVzTS5pQJ6dN590aj4noiSR05rTLquZJeZ9jN\nalyfOyaq6gcIe8DfxQsgWdhtWrItVExqS3UuAyL94XXSTVA6tVw048ERa4Ak6Dbn\na5rDQBWnQwKBgQCmhR/9xEKbIDAuAmJhUCSM6Wm95HpKlOZAblXgF9jne12Gtky6\nB/KPj4AAbaLX44V8HW57kLF33ADf0bFI7IoTUd0C8ULsV+kyvJUq1x5JHxNUF925\n+0i/vPsSmOI4ai+9evnGeuxKOGVpKIZrNFuHFuiBkf3Ih3cpAJuw+eYxHwKBgDaU\nj0UDmo8LpjhSYhdD/KFfDP4cT9SIrKZbBiw4IFr/CXXXX6Xu6sfLEZQPfX9oSPWh\nRERXIcwJJUWeOGNA1gj10z3b7y8eJmZCtNWXkD5/jKkGFT2c1Q8J3iqOIBdg1hqp\n/Wv4cftx8rfg2p0gNcsbCCchIOaf2U83ZJG6XBStAoGAKgZ0HRxTeG+SuCTRHTy/\nq37B75dk7idmAN8DBKhOxK58n2EqD0ZheVxhs/K81AOIeoeuucQxPryGdvb1mwma\nnsUUUBJRqDaKPdTegOCO63qYJJnxYpjROZng/I3XuVlnNtotkIw+sO6p0uaG5GSi\nrQghJ3waWmzcGoc9EelP5gA=\n-----END PRIVATE KEY-----\n",
      SPREADSHEET_ID: "1wHRQzWns6ULDyGiiANjfWwcPkrn_eoB_gEWWGIN4oNk",
      SHEET_ID: 0,
      CLIENT_EMAIL:
        "main-page-counsellor@main-page-counsellor.iam.gserviceaccount.com",
      PRIVATE_KEY:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCM27xHkO0vaSk\ncZFT0MxGY2H7uGL0ThktKb1o1gMegIXQMdivwGED/Y1EOczf6g3InLw094x8J6Ux\nfGAM+QgjyFpFqUAhWA9+6Puu2For+RCs6gFKTD47gTPxjHlJYrfqNHROqrOoDdA6\nI42SaO4ywyhwjFfe5WR29DxZNnfbT5rsF/JL5PtJR23dMHKNOeytBclFSUOhH7rS\nA4hzk02gaXg20BdY0Sw2+fZ3RAwMLSqZAj41EDwyriNh3ZNv16rbWaNORc0amXKG\nPywWD4kzawYttM1lOD11yu/t64dDn6bOm7LDMHOwN3FODu3JN/zz3uiH997Th873\nCNneRC2vAgMBAAECggEAHKLYm03IU74FKZ8k0V8AHZRTuKUN/mgHwVz0H6Hd2uET\nxPPyDP8eryfJGBmNKCrLYTIaH0CuOAk2jDoCsIGw8r8n7zllCfsCFJzcBAJw0CbN\nZS9VBQoswQ8tGX4Kd8j1RV/6aIvhAF5tE9hLQh7JRQtPCsLpxXs+RGYrrJy3XCC6\ni5NXCzABzyaT3njejLlmmUTO88F3NNFrrxeyLE0zVUH4MurrBYqUgjL9s+waiJp0\nOvjaeqNp8FA1vZI8BWEerdRGRqflQUk1t5pnFH7DfQhr6OnDEM9FYto6K7wt5otp\nqssxY+mHksu6D/ww6xRwROa3V+DMUAFtgZCcIFHwJQKBgQDsaAluxfZzDPf/f4O4\ndQn3Wk/NlQr7gLt56JsloK3MtbyQPePntup8sxLXqN97NutXIYGLx2BfmEuYeE2F\nkeuhjWyD0F9n9UPlnMMeRlwsAzJD6/Rwk6uco/WMy/FuX5ltIQ9LoLzpWDCYmTgX\ng23SJnFe6y6g/+CqBPwIrwXbkwKBgQDSS+Za+ovOdlK3JbYqcnfl40tQLsTELJQL\n/N0izz1fnWPfd6wYBqn48IgY1bxfygenIMeEKtqtXUxa+qiZf/TWpsW07TsOh79V\n+cTHYVGbCA4+OB4Ybm43YBJHjXve5sViVv6PFFoGp78WYkv+cDWRdRz/+DgD8h10\ngW1MpB0O9QKBgHn6aDuOy02ruF5NVhKb2QuWvqxtpaAFWTZarYqpsGN6thOay3go\nqi6zWxqJWN5DhQSNFkGgGvrYItFF6YHsu668wOv2XPPP2jukOgzp8u8Gqy3ell5r\n41VMSAtgw27WxtxG/ZRhGHgx98kU7Zs8RjLzgPWf1Yxe2nX/Yme8nwIfAoGANFoW\nx5FV2pkUMGnf9qM2e/Fgn151N40NcgqKFo9W7QWmhkwpeHW4PLPMfbo/wezuiMmd\nQabVd5EhYAjEjioPjpxH3amtKQncNRAPz77HbPvNZ+nafCSJpZlyE4QCUVRL0RZt\nGrtrSfralDz2RCo0+7gW9xYZA8pzULyjtA+q+D0CgYEA417Ii398DqZPwFwkynNt\n8J16cBZSQ1yY3HKQU+x2StLHQTUC+YK1JTauumtyEz/YJXDlIM48lwi1pDgZBj5K\nrE2sbRNt7zb8XvRnZGr+MObtIJ0/ABbs/q87Q1zmoJ0Yk0tURax5njyKzaAISgYv\nHLPX1QZAp7dd9sTrpTbnze8=\n-----END PRIVATE KEY-----\n",
      CLIENT_EMAIL_NEET: "neet-ug@neet-ug-331912.iam.gserviceaccount.com",
      PRIVATE_KEY_NEET:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZ6ZU1IuPYw2Ff\nzrwxyYsjhFKdnVhFo2QPwGHP7Dc3n6BBzBlj7kZF+P3jalnWoDfbTwEz5mQtge2s\ng67/I56K4pqkgj0U97JUSsuVwk9AM3EE2tNXIbwpV9lwUjRqYe3l2AXoOSCvxqdX\nXESCa/NLfhwgBRzrh7fISnu5ZQEuJEHmprYMnw4VFQBx4lQRh31sOVkeoxshj1xz\nqnANNqbOAH/EY9Qw0Zm27sdowIV6qJb29rzQ9fbacECCBAqzTcjRL7aHl/UBfaKO\n+X2kIv4Br92mgzlkmPjHf6jQ2X4Wsd1/sqy5AoxzZcjodX6TrV3LX+Q44ETZJYhO\nPogRLjWTAgMBAAECggEAEJvH/oPJP+UsT8QO/fBxhWR5c3/hkXUxlC3ChrlnP/sP\nmNQ4fzBS9NRUbXfWnxAZEcMEwXLm4b0MY2Cp/tI1LDq3NKCkjSuP0PLeb2ye47LI\nA2m2P+bXU4NZlED/s7gBDMqZMKjh/+OxL2xd4F7f7ToQZLRfDuiKLl7W7Ttwipae\n0+GjRGKHevD4sved3LOxdOS/mn/vlPZunCLsya/RwIpm+r0dx9xA6bSlTukqa8vI\noNaPknE572YCGDzqeNekQTbEPvroohs2oXAh2IBF5Mk9OxObDJaCj0IfrgEPGgR/\naSILCb33KhQeABXA3ps53cPiWFYSzUvzqaWylzZs4QKBgQD1KRsm7AJs7ea7I/om\nUimRrt4699DKRyKq9W7d3fTgEs8h6JlNp9thyziIeIdwl2nzB0fhF4wJH8JrbBhF\nkL7EWnzItrGtvVW9xgp/MsSrwjMAZRrUCRuuF/VgsrmRMun5oz+88JzxHmdLZK8i\nj80tdzD6v4p/GGASj/9/RMb0IwKBgQDjjBBX7brSypkLplm1fupkdSHlWkAKY1Di\nxIWiCoepFuy27Q7RG1VnVIsXckY8dKJNZGx3hyWKRQ9w01hVx0Y8Vb5IfhHPfcUl\nYRxWNCsZ3lwdJk3kgHbTlvSut1P9v1yZaXgasOx0H17w7BVxRBayJhHl7SQ0lyr9\noXnOryNX0QKBgHkqFbdI0XIQqgY3o7wow06zBDZUoCY4vhOMNX0F466S3Tg/AvV0\nTmKo04nvN9EXpE9ue8Htp1IjFi2NQPmwrffRWPbCBFJ/zs56AFoZN0ZENnyte3Ls\nBXgncyiVbE0swqKUYj35FTe99QM4Aa6tL5SW4egrnkFuRJ0n+fhmf4XNAoGBAI45\npqF++w30ChMJB/t0d4cQ233imjKj/xOuaCRvVnnu1UhFBcTXw9rRMhsWlyYEdMnQ\n4icXtvQk1FDeGNGMu67MnSHsgq9hWk9R0odjFimWHZcusPMJBLyeFxP5jKsG6BcP\noD12pmSykwIdXg2s1E7HktpXDhE9B2b+fgcc2wdxAoGBAM4/kcT3NZRz4TF9EIWL\ng+EEl/UrTUVAuNAZIT/rSRTQpa6Qdqlc+Tg2ESK9SVfMSltZkhnyw6RHIujXafuB\nWfHe9vfj4xrHfv2HmYEFdFOBsIlMo4Hbcq8WwxGY4l5XLvKxA41Wzs55QYQfWimm\nmIy/4wROWc+nRfVUpMQNP21s\n-----END PRIVATE KEY-----\n",
      SPREADSHEET_ID_NEET: "17kj23hDcfpUyMOUkqLZK1tfYAjWKAQ8xCNO9BqzXT5E",
      SHEET_ID_NEET: 0,
    },
    webpack: (config, options) => {
      config.node = {
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        ...config.node,
        fs: "empty",
        child_process: "empty",
        net: "empty",
        tls: "empty",
      };

      return config;
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.css$/i,
    //       loader: "css-loader",
    //       options: {
    //         import: {
    //           filter: (url, media, resourcePath) => {
    //             // resourcePath - path to css file

    //             // Don't handle `style.css` import
    //             if (
    //               url.includes(
    //                 "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
    //               )
    //             ) {
    //               return false;
    //             }

    //             return true;
    //           },
    //         },
    //       },
    //     },
    //   ],
    // },
  };
//   })
// );
