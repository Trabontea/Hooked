import React from "react";

// const Header = props => {
//   return (
//     <header className="App-header">
//       <h2>{props.text}</h2>
//     </header>
//   );
// };

//functional component

//folosim deconstruction
const Header = ({text}) => {
  return (
    <header className="App-header">
      <h2>{text}</h2>
    </header>
  );
};


export default Header;