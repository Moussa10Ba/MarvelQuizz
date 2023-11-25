import React,{useEffect, useState} from 'react'
import Stepper from 'react-stepper-horizontal'


const Levels = ({currentLevel, levelNames}) => {
        const [levels, setLevels] = useState([]);

        useEffect(() => {
         const gettedLevels = levelNames.map((level)=>{
          return  {title: level.toUpperCase()}
         })
         setLevels(gettedLevels)
        }, [currentLevel])
        
  return (
    <div className='levelsContainer' style={{backgroundColor:'transparent'}}>
      <Stepper 
      steps={ levels }
      activeStep={ currentLevel } 
      activeTitleColor={'#d31017'}
      circleTop={30}
      activeColor={'#d31017'}
      completeTitleColor={'#E0E0E0'}
      defaultTitleColor={'#E0E0E0'}
      completeColor={'#E0E0E0'}
      barStyle={'dashed'}
      size={45}
      circleFontSize={20}
      />
    </div>
  )
}

export default React.memo(Levels)
