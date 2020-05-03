import React from "react"
import { graphql } from "gatsby";

const Home = (props) => {
  return (
    <main>
      <p>Hello world! This is the home page!</p>
    </main>
  );
}

// export const query = graphql`
// {
//   allpets {
//     edges {
//       node {
//         id
//         energy
//         fun
//         happiness
//         hunger
//       }
//     }
//   }
// }
// `

export default Home
