import React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Header from "../components/header";

const Home = (props) => {
  console.log(props);
  return (
    <Layout>
      <main>
        <p>Hello world!</p>
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
