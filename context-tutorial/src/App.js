import React from 'react';
import ColorBox from './components/ColorBox';
import {ColorProvider} from './contexts/color';
import SelectColors from './components/SelectColors';

const App = () => {
  return (
    // Provider를 사용하면 Context의 value를 변경할 수 있다. Provider를 사용할때 value값은 필수로 명시.
    //<ColorContext.Provider value={{color:'red'}}>
    <ColorProvider>
    <div>
      <SelectColors/>
      <ColorBox/>
    </div>
    </ColorProvider>
    //</ColorContext.Provider>
  );
};
export default App;