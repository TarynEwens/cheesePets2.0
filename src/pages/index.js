import React from "react"
import { Link } from "gatsby"
import pug from '../../static/pets/pug_01.png';
import axolotl from '../../static/pets/axolotl_01.png';


const Home = (props) => {
  return (
    <section className={"home"}>
      <div className={'content'}>
        <img
          src={axolotl}
          alt={'Cartoon axolotl'}
          className={"home__axolotl"}
        />

        <div class="home__textArea">
          <p>Recently a brave and kind explorer found an island that wasn't on the map... she had discovered the mystical home of the CheesePets! </p>
          <p>An adoption center looks after baby CheesePets who are hungry, lonely, and need your help!</p>
          <Link to="/register" className={'button button--cta'}>Sign up to adopt a CheesePet</Link>
          <p>Play games to find pieces of cheese and look after your pet!</p>

        </div>
        <img
          src={pug}
          alt={'Cartoon pug'}
          className={"home__pug"}
        />
      </div>
    </section>
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
