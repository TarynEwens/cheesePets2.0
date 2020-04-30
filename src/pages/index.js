import React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout";

const Home = (props) => {
  return (
    <Layout>
      <main>
        <p>Hello world! This is the home page!</p>
      </main>
    </Layout>
  );
}

export const query = graphql`
{
  allPets {
    edges {
      node {
        id
        energy
        fun
        happiness
        hunger
      }
    }
  }
}
`

export default Home
