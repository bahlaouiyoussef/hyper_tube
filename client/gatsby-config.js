module.exports = {
  siteMetadata: {
    title: `Hypertube`,
    description: `Hypertube is a torrent based streaming website`,
    author: `!SilentCorner`,
  },
  proxy: {
    prefix: "/api",
    url: "http://server:3000",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-antd`,
      options: {
        style: true,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-less",
      options: {
        javascriptEnabled: true,
        modifyVars: {
          "heading-color": "#DCF763",
          "body-background": "#042A2B",
          "component-background": "#042A2BEE",
          "primary-color": "#48E5C2",
          "normal-color": "#2E927C",
          "text-color": "#48E5C2",
          "icon-color": "#48E5C2",
          "icon-color-hover": "#FCFCFC",
          "highlight-color": "#DCF763",
          "disabled-color": "#216959",
          "disabled-bg": "#216959",
          "font-family": "'Helvetica Neue', 'Roboto', sans-serif",
          "btn-font-weight": "700",
          "btn-primary-color": "#FCFCFC",
          "btn-default-color": "#48E5C2",
          "btn-default-bg": "transparent",
          "btn-default-border": "#48E5C2",
          "input-height-base": "60px",
          "input-bg": "#FAFAFA",
          "input-color": "#48E5C2",
          "input-placeholder-color": "#DDDDDD",
          "font-size-base": "14px",
          "popover-arrow-width": "0",
          "item-active-bg": "#DCF763",
          "item-hover-bg": "#FCFCFC",
          "border-color-base": "#2E927C",
          "border-color-split": "#2E927C",
          "pagination-item-bg": "#042A2BCC",
          "pagination-item-bg-active": "#1A3D3E42",
          "comment-author-name-color": "#48E5C2",
          "comment-author-time-color": "#287D6A",
          "comment-action-color": "#FED766",
          "comment-action-hover-color": "#DCF763",
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
