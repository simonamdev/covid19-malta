module.exports = {
  siteMetadata: {
    title: `Covid-19 in Malta`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: false, // boolean, defaults to true - if false API will return unformatted string from new Date()
        formatting: {
          format: 'dddd D MMMM YYYY', // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
          utc: false, // boolean, defaults to false - output time as UTC or not, following date-and-time API
        },
        // locale: 'fr', // string, defaults to null, which date-and-time defaults as "en" - whether to localize the date or not, can use any available date-and-time localization
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-webpack-size`
    // Add typescript stack into webpack
  ],
}
