import React, { Fragment } from 'react'

const ProgressBar = ({isQuizOver, score, idQuestion,maxQuestions }) => {
  console.log(score);
  console.log(maxQuestions, score);
  const currentValueId= idQuestion +1;
  const percentage = currentValueId * 10;
  const succesPourcentage = (score * 100) / 10 ;

  console.log(isQuizOver, score);

  const displaySuccesOrFail = score >= maxQuestions/5 ? (
    <Fragment>
    <div className='percentage'>
        <div className='progressPercent' style={{backgroundColor: '#5df0ab', color: '#white', textAlign: 'center',  border: '1px solid #5df0ab'}}>Score: {score} /{maxQuestions}</div>
    </div>
    </Fragment>
  ) : (
    <Fragment>
    <div className='percentage'>
        <div className='progressPercent' style={{backgroundColor: '#f05d5d', color: 'white', textAlign: 'center'}}>Score: {score} /{maxQuestions}</div>
    </div>
    </Fragment>
  );
  return isQuizOver  ? (
   displaySuccesOrFail
  ) :
  (
    <Fragment>
    <div className='percentage'>
        <div className='progressPercent'>Question: {idQuestion +1}/10</div>
        <div className='progressPercent'>Progression: {percentage}%</div>
    </div>
    <div className='progressBar'>
        <div className='progressBarChange' style={{width: `${percentage}%`}}></div>
    </div>
    </Fragment>
  )
}

export default React.memo(ProgressBar)
