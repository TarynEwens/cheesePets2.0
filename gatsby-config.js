require('dotenv').config({
  path: '.env'
})

module.exports = {
  siteMetadata: {
    title: `CheesePets 2.0`,
    author: `Taryn Ewens`,
    description: `A virtual pet website.`,
    siteUrl: `https://cheesepets.taryn.codes`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-firesource',
      options: {
        credential: {
          "type": process.env.FIREBASE_TYPE,
          "project_id": process.env.FIREBASE_PROJECT_ID,
          "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
          "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          "client_email": process.env.FIREBASE_CLIENT_EMAIL,
          "client_id": process.env.FIREBASE_CLIENT_ID,
          "auth_uri": process.env.FIREBASE_AUTH_URI,
          "token_uri": process.env.FIREBASE_TOKEN_URI,
          "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
        },
        types: [
          {
            type: 'Pets',
            collection: 'pets',
            map: doc => ({
              species: doc.species,
              name: doc.name,
              happiness: doc.happiness,
              hunger: doc.hunger,
              energy: doc.energy,
              fun: doc.fun,
              dateCreated: doc.createdAt,
              username: doc.user
            }),
          },
          {
            type: 'Items',
            collection: 'items',
            map: doc => ({
              name: doc.name,
              action: doc.action,
              image: doc.image,
              price: doc.price
            }),
          },
        ],
      },
    },
    // You can have multiple instances of this plugin
    // to read source nodes from different locations on your
    // filesystem.
    //
    // The following sets up the Jekyll pattern of having a
    // "pages" directory for Markdown files and a "data" directory
    // for `.json`, `.yaml`, `.csv`.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`,
        name: `static`,
      },
    },
  ],
}
