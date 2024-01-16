// import { useState } from 'react'
// import './App.css'
// import Form from './Components/Form';
// import PolygonGenerator from './Components/DraftSpin';
// import WheelComponent from './Components/Canvas';
// function App() {
//   const [polygonsData, setPolygonsData] = useState([
//     { size: 260, color: 'red', text: 'Polygon 1' },
//     { size: 260, color: 'blue', text: 'Polygon 2' },
//     { size: 260, color: 'pink', text: 'Polygon 3' },
//     { size: 260, color: 'green', text: 'Polygon 4' },
//     { size: 260, color: 'yellow', text: 'Polygon 5' },
//     { size: 260, color: 'magenta', text: 'Polygon 6' },
//     { size: 260, color: 'grey', text: 'Polygon 7' },
//     { size: 260, color: 'lightblue', text: 'Polygon 7' },
//     { size: 260, color: 'white', text: 'Polygon 9' },
   
   
//   ]);
//   return (
//     <>
//       <WheelComponent/>
//       <PolygonGenerator polygonsData={polygonsData} setPolygonsData={setPolygonsData}/>
//       <Form/> 
//     </>
//   )
// }

// export default App
import { useSpinnerContext } from "./Context/Wheelcontext";
import SpinnerContainer from "./Components/SpinnerContainer";
import { UserDetails } from "./UserData/UserDetails";
function App() {
  const { isSpinnerReadyToSpin } = useSpinnerContext();
  return (
      <div className="layout">
          <div
              style={{
                  minWidth: isSpinnerReadyToSpin ? "60dvw" : "40dvw",
                  transition: "min-width 0.2s ease-in-out",
              }}
              className="left-side"
          >
              <SpinnerContainer />
          </div>
          <div
              style={{
                  minWidth: isSpinnerReadyToSpin ? "40dvw" : "60dvw",
                  transition: "min-width 0.2s ease-in-out",
              }}
              className="right-side"
          >
              <UserDetails />
          </div>
      </div>
  );
}

export default App;
