import FrontPage from "./FrontPage";

function MainDisplay({ albums }) {
  return albums ? <FrontPage albums={albums} /> : null;
}

export default MainDisplay;
