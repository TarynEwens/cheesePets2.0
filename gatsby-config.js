module.exports = {
  siteMetadata: {
    title: `CheesePets 2.0`,
    author: `Taryn Ewens`,
    description: `A virtual pet website.`,
    siteUrl: `http://localhost:8000`,
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
        credential: require("./firebase.json"),
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
              createdAt: doc.createdAt,
              user: doc.user
            }),
          },
          {
            type: 'Items',
            collection: 'items',
            map: doc => ({
              name: doc.name,
              action: doc.action,
              image: doc.image,
              price: doc.price,
              user: doc.user
            }),
          },
        ],
      },
    },
  ],
}
