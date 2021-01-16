import React, { useState, useEffect } from 'react';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';

import './App.css';
import QuizData from './data';

function App() {
	const [questions, setQuestions] = useState([])
	const [score, setScore] = useState(0)
	const [responseCount, setResponseCount] = useState(0)

	const getQuestions = () => {
		const data = () => QuizData.sort(() => 0.5 - Math.random()).slice(0, 5);
		setQuestions(data())
	}

	useEffect( () => {
		getQuestions()	
	}, [])

	const playAgain = () => {
		getQuestions()
		setScore(0)
		setResponseCount(0)
	}

	const computeAnswer = (answer, correctAnswer) => {
		if(answer === correctAnswer) {
			setScore( prevScore => prevScore + 1 )
		}
		
		setResponseCount( prevResponseCount => prevResponseCount < 5 ? prevResponseCount + 1 : 5 )
	}

	return (
		<main className='container'>
			<div className='title'>Quiz App</div>

			<div>
				{questions.length > 0 &&
					responseCount < 5 &&
						questions.map( ({question, answers, correct, questionId}) => (
							<QuestionBox
								key={questionId} 
								question={question} 
								options={answers}
								selected={ answer => computeAnswer(answer, correct) }
							/>
						))
				}

				{responseCount === 5 ? (
					<Result score={score} playAgain={playAgain} />
				) : (
					null
				)
				}
			</div>
		</main>
	);
}

export default App
