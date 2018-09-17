import React from 'react';
import MainScreenContainer from "../components/mainScreen/mainScreenContainer";
import SubScreensContainer from "../components/subScreens/subScreensContainer";


const MainContentContainer = () => {
  return <div style={style}>
    <MainScreenContainer/>
    <SubScreensContainer/>
  </div>
};

const style = {
  display: "flex",
  backgroundColor: "white",
  height: "80vh",
  boxShadow: "0 2rem 6rem rgba(0, 0, 0, .3)",
  borderRadius: "5px",
  overflow: "hidden"
};

export default MainContentContainer;

