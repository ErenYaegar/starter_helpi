import React, { useState } from 'react';
import { Container, Nav, Navbar, ProgressBar } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { styled } from '@mui/material/styles';
import CareerFinder from '../images/CareerFinder.png';

export function BasicQuestionsPage(): JSX.Element {
    const StyledButton = styled(Button)`
    ${({ theme }) => `
    cursor: pointer;
    background-color: #ce93d8;
    color: #FFF;
    transition: ${theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.standard,
    })};
    &:hover {
      background-color: #ab47bc;
      transform: scale(1.3);
    }
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    `}
  `;

  const questions = [
    {
        questionText: 'How do you prefer to spend your spare time??',
        answerOptions: [
            { answerText: 'Reading books or articles 📚' },
            { answerText: 'Exploring nature or traveling 🌲' },
            { answerText: 'Solving puzzles or playing strategy games ♟️' },
            { answerText: 'Creating art or DIY projects 🖌️' },
            { answerText: 'Volunteering or helping at community events 🤝' },
        ],
    },
    {
        questionText: 'Choose a school subject you excelled in or enjoyed the most.',
        answerOptions: [
            { answerText: 'Literature or languages 📖' },
            { answerText: 'Biology or environmental science 🌱' },
            { answerText: 'Mathematics or computer science 💻' },
            { answerText: 'Art or music 🎨🎵' },
            { answerText: 'Social studies or psychology 🧠' },
        ],
    },
    {
        questionText: 'What kind of problems do you enjoy solving?',
        answerOptions: [
            { answerText: 'Ones that involve words or communication issues 📝' },
            { answerText: 'Practical, hands-on challenges 🔧' },
            { answerText: 'Logical or complex theoretical problems 🧩' },
            { answerText: 'Creative challenges that require an artistic solution 🎭' },
            { answerText: 'Social issues or conflicts between people 🌍' },
        ],
    },
    {
        questionText: 'Which type of work environment do you prefer?',
        answerOptions: [
            { answerText: 'Quiet, solitary, and focused 🤫' },
            { answerText: 'Outdoors and variable 🌤️' },
            { answerText: 'Structured, with clear rules and goals 🏢' },
            { answerText: 'Flexible and creative 🎨' },
            { answerText: 'Collaborative and team-oriented 🤝' },
        ],
    },
    {
        questionText: 'How do you prefer to contribute to a team?',
        answerOptions: [
            { answerText: 'By writing, editing, or documenting 📄' },
            { answerText: 'By leading or managing resources 🚀' },
            { answerText: 'By analyzing data or designing systems 🔍' },
            { answerText: 'By generating ideas or creating visuals ✒️' },
            { answerText: 'By mediating conflicts or organizing group efforts 🕊️' },
        ],
    },
    {
        questionText: 'What motivates you the most in a job?',
        answerOptions: [
            { answerText: 'The opportunity to learn and apply new information 📘' },
            { answerText: 'The chance to make a tangible impact 🌍' },
            { answerText: 'Challenges that push your intellectual limits 🚀' },
            { answerText: 'The ability to express yourself creatively 🎭' },
            { answerText: 'Working with diverse groups of people 🌐' },
        ],
    },
    {
        questionText: 'What role do you naturally find yourself taking in group settings?',
        answerOptions: [
            { answerText: 'The researcher or the one who gathers information 🔎' },
            { answerText: 'The hands-on practical problem solver 🛠️' },
            { answerText: 'The strategist or planner 📈' },
            { answerText: 'The designer or the one who adds a creative touch 🎨' },
            { answerText: 'The coordinator or the leader who oversees the project 🌟' },
        ],
    }
];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [goToHomePage, setGoToHomePage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayFinishButton, setDisplayFinishButton] = useState(false);
  const [displayFinalResults, setDisplayFinalResults] = useState(false);
  const [gptResponse, setGptResponse] = useState<string>('');
  const [goToDetailedQuestionsPage, setGoToDetailedQuestionsPage] = React.useState(false);
    //const [goToHomePage, setGoToHomePage] = React.useState(false);

    if (goToDetailedQuestionsPage) {
        return <Navigate to="/DetailedQuestionsPage"/>
    }

    const handleRetakeTest = () => {
      setCurrentQuestion(0); // Reset current question to start from the beginning
      setDisplayFinalResults(false); // Hide final results
      setSelectedAnswers(new Array(questions.length).fill('')); // Reset selected answers array
      setGptResponse(''); // Clear GPT response
      // Reset any other state variables as needed
  };

  const handleAnswerOptionClick = (answerText: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answerText;
    setSelectedAnswers(updatedAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setDisplayFinishButton(true);
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
  };

  const handleGoToHomePage = () => {
    setGoToHomePage(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDisplayFinalResults = () => {
    setDisplayFinalResults(true);
    setDisplayFinishButton(false);
  };

  const handleGetAnswers = async () => {
    const prompt = selectedAnswers.join(' ');
    let apiKey = localStorage.getItem('MYKEY');

    console.log('API Key:', apiKey);

    if (apiKey){
        apiKey = apiKey.replace(/^"(.*)"$/, '$1')
    }
  
    if (!apiKey) {
      console.error("API key is missing. Make sure REACT_APP_OPENAI_API_KEY is set in your .env file.");
      return;
    }
  
    try {
      console.log('Sending request to OpenAI with prompt:', prompt);
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Do research on career that best suits me based on these questions. Only give the 5 positions and only the position name" }, { role: "user", content: prompt }],
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      });
  
      console.log('Response from OpenAI:', response.data); 
      if (response.data.choices && response.data.choices.length > 0) {
        setGptResponse(response.data.choices[0].message.content);
        setDisplayFinalResults(true); 
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error("Error when calling OpenAI:", error);
    }
  };
  
  if (goToHomePage) {
    return <Navigate to="/" />;
  }

  return (
    <div>
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">CareerFinder4U</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={handleGoToHomePage}>Home</Nav.Link>
          <Nav.Link onClick={() => {setGoToDetailedQuestionsPage(true)}}>Detailed Questions Page</Nav.Link>
        </Nav>
        <Nav className="ms-auto"> {/* Use ms-auto to push items to the right */}
                        <img src={CareerFinder} alt="CareerFinder4U Logo" style={{ height: 50, width: 50 }} />
                    </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <h1 className='padding7'>Basic Questions Page</h1>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh',zIndex:'-1px' }}>
    <div className='padding5' >
    <Card variant="plain" sx={{ width: 600, height: 'auto' }}>
      <CardContent>
        {!displayFinalResults ? (
          <>
            <Typography style={{paddingTop: '20px'}} level="title-md"><div className='poppins-regular'>Question {currentQuestion + 1} of {questions.length}</div></Typography>
            <ProgressBar
              min={0} // Minimum value progress can begin from
              now={(currentQuestion + 1) * (100 / questions.length)} // Current value of progress
              max={100} // Maximum value progress can reach
              label={`${Math.round(((currentQuestion + 1) * (100 / questions.length)))}%`} // Show label that represents visual percentage
              visuallyHidden={true} // Show the label visually
              striped={currentQuestion >= 0} // Uses a gradient to create a striped effect when the progress is at least 0%
              animated={currentQuestion >= 0} // Animate the stripes from right to left when the progress is at least 0%
              variant="info" // Sets the background class of the progress bar to red
              
              style={{ margin: '20px 0', width: '100%' }}
            />
            <Typography style={{paddingTop: '10px', paddingBottom: '20px'}}><div className='poppins-regular'>{questions[currentQuestion].questionText}</div></Typography>
            {questions[currentQuestion].answerOptions.map((option, index) => (
              
              <StyledButton 
                key={index} 
                onClick={() => handleAnswerOptionClick(option.answerText)} 
                style={{ 
                  margin: '10px',
                  backgroundColor: selectedAnswers[currentQuestion] === option.answerText ? '#ab47bc' : '#ce93d8',
                }}
              >
                {option.answerText}
              </StyledButton>
              
            ))}
            {currentQuestion > 0 && (
              <StyledButton onClick={handlePreviousQuestion}>Previous Question</StyledButton>
            )}
            {currentQuestion === questions.length - 1 && (
              <StyledButton onClick={handleGetAnswers}>Finish & Get Results</StyledButton>
            )}
          </>
        ) : (
          <>
            <Typography level="h4">AI Generated Summary:</Typography>
            <div style={{ height: '300px', overflowY: 'auto', marginTop: '20px' }}></div>
            <Typography>{gptResponse}</Typography>
            <StyledButton onClick={handleGoToHomePage}>Home</StyledButton>
            <StyledButton onClick={handleRetakeTest}
                           // Adjust marginBottom to lower the button
                            >Retake Test
                            </StyledButton>
          </>
        )}
      </CardContent>
    </Card>
    </div>
  </div>
</div>
  )
        }