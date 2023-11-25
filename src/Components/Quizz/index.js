import React, {Component, Fragment, PureComponent} from 'react'
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';
import { FaChevronRight } from "react-icons/fa6";

class Quizz extends Component {

 
  constructor(props){
      super(props)

      this.initialState = {
        maxQuestions: 10,
        storedQuestions: [],
        levelNames: ['debutant', 'confirme', 'expert'],
        currentLevel: 0,
        question: null,
        options: [],
        questionId: 0,
        userAnswer: null,
        btnDisabled: true,
        score: 0,
        showWelcomeMsg: false,
        isQuizOver: false,
    
      }
      this.state = this.initialState
      this.questionsRefWithAnswer = React.createRef();
  }
 

  // Loading next Level

   nextLevel = (param) => {
      this.setState({...this.setState, currentLevel: param});
      this.fetchData(this.state.levelNames[param]);
      console.log(this.state.levelNames[param]);
      this.setState({isQuizOver: false, score: 0, questionId: 0});
   }
 

      // Getting questions From Questions Quizz 
   fetchData = (level)=>{
    //console.log(level);
       const data = QuizMarvel[0].quizz[level];
      this.questionsRefWithAnswer.current = data;
       if(data.length >= 10){
        const filteredData = data.map(({ answer, ...keepRest})=> keepRest);
        this.setState({
          storedQuestions:filteredData
        })
        console.log(this.state.storedQuestions);
       }else{
        console.log('No enought Data');
       }
  }


  componentDidMount(){
    this.fetchData(this.state.levelNames[this.state.currentLevel]);

  }

  componentDidUpdate(prevProps, prevState){

    if(this.state.storedQuestions !== prevState.storedQuestions){
    //  console.log(this.state.questionId);
     console.log( this.state.storedQuestions);
        console.log(this.state.storedQuestions[this.state.questionId])
        this.setState({
          question: this.state.storedQuestions[this.state.questionId].question,
          options: this.state.storedQuestions[this.state.questionId].options
        })
    }
   if(this.state.questionId !== prevState.questionId){
      this.setState({
        question: this.state.storedQuestions[this.state.questionId].question,
        options: this.state.storedQuestions[this.state.questionId].options,
        userAnswer: null,
        btnDisabled: true,
      })
    }
        if(this.props.userData.pseudo){
          if(!this.state.showWelcomeMsg){
            this.welcomMsg(this.props.userData.pseudo);
            this.setState({
              showWelcomeMsg: true
            })
          }
          
        }     
    
  }

  // Toast for the Welcome Display Msg
  welcomMsg = (pseudo) => {
    toast.warn(`Welcome ${pseudo}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  handleAnswer = (selectedAnswer) => {
      this.setState({
        userAnswer: selectedAnswer,
        btnDisabled: false,
      })
     
  }


  nextQuestion = (prevState) => {
    if(this.state.questionId === this.state.maxQuestions -1){
      this.gameOver();
    }else{
        this.setState(prevState => ({
          questionId: prevState.questionId + 1
        }))
       
    
}

    const goodAnswer = this.questionsRefWithAnswer.current[this.state.questionId].answer;
    if(goodAnswer === this.state.userAnswer){
        this.setState( ({
            score: this.state.score + 1
        }))
        toast.success('Congratulation +1 ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    }else{
      toast.error('Oups Wrong !! ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

     

  gameOver = ()=> {
    this.setState({
      isQuizOver: true
    })
  }

 render(){
  const {pseudo} = this.props.userData;

  const displayOptions = this.state.options.map((option, index)=>{
          return <p
          key={index} 
          className={`answerOptions ${this.state.userAnswer === option ? 'selected' : null}`}
          onClick={()=>this.handleAnswer(option)}
          >
          <FaChevronRight/>  {option}
          </p>
          
  })

  const textBtn = this.state.questionId < this.state.maxQuestions -1 ? 'Next' : 'End';


  // Render Quizz Over Or Questions options 

    return this.state.isQuizOver ? (
      <>
         <Levels levelNames={this.state.levelNames} currentLevel={this.state.currentLevel}/>
          <ProgressBar 
          idQuestion={this.state.questionId} 
          isQuizOver={this.state.isQuizOver} 
          score={this.state.score}
          maxQuestions={this.state.maxQuestions}
          nextLevel={this.state.nextLevel}
          />
          <QuizOver
          ref={this.questionsRefWithAnswer} 
          score={this.state.score} 
          maxQuestions={this.state.maxQuestions}
          currentLevel={this.state.currentLevel}
          nextLevel={this.nextLevel}
          />
      </>
      ) : (
        <>
        <Levels levelNames={this.state.levelNames} currentLevel={this.state.currentLevel}/>
        <ProgressBar 
          idQuestion={this.state.questionId} 
          isQuizOver={this.state.isQuizOver} 
          score={this.state.score}
          />
        <ToastContainer/>
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button 
        disabled={this.state.btnDisabled} 
        className='btnSubmit'
        onClick={this.nextQuestion}
        >
          {textBtn}
          </button>
      </>
      ) 
 }
}

export default Quizz
