import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GiTrophyCup } from "react-icons/gi";

const QuizOver  = React.forwardRef((props,ref)=>{
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [score, setScore] =  useState(props.score);
    const numberQuestion = props.maxQuestions;
    var currentLevel = props.currentLevel;
    const averageScore =  numberQuestion / 2;
    const nextLevel = props.nextLevel;
    
    

    const canDisplayAnswer =  score >= numberQuestion/2;
   
    useEffect(() => {
      setQuestions(ref.current);
    }, [questions, score])

    const answers = questions.map((question)=>{
        return <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td><button className='btnInfo'>Infos</button></td>
              </tr>
    })

    const displayOrHide = canDisplayAnswer ? (answers) : (<div className='loader'></div>);  



    const displayMsg = score >= numberQuestion/2 && currentLevel < 2 ? (
        <>
        
            <div className='stepsBtnContainer'>
                  <p className='successMsg'>Congratulation Reasy for next Level !</p>
                  <button disabled={false} className='button-success' onClick={()=> nextLevel(currentLevel + 1)}>Next Level</button>
            </div>
        </>
    ) : score >= averageScore && currentLevel == 2 ? ( 
    <div className='stepsBtnContainer'>
        
        <GiTrophyCup size='50px' color='green' /> <p className='successMsg'>Congratulation your are an expert!</p>
    <button disabled={false} className='button-success'>Home</button>
    </div>) : (
        <div className='stepsBtnContainer'>
        <p className='failureMsg'>Sorry You Loose !</p>
        <button className='button-error' >Try Again</button>
    </div>
    ) ;
         
    
    return  (
          <Fragment>
              {displayMsg}
              <hr/>
              <p>Answers for the asked questions</p>
              <div className='answerContainer'>
                      <table className='answers'>
                              <thead>
                                  <tr>
                                      <th>Questions</th>
                                      <th>Answer</th>
                                      <th>Infos</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {  
                                    displayOrHide
                                  }
                                    
                              </tbody>
                      </table>
              </div>
          </Fragment>
        )   
      
})
export default React.memo(QuizOver)
