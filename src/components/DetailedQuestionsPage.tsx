import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/joy/FormControl';

import FormHelperText from '@mui/joy/FormHelperText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Grow } from '@mui/material';


export function DetailedQuestionsPage(): JSX.Element {
    interface Responses {
        [key: number]: string
    }

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
    `}
  `;

  const StyledButton2 = styled(Button)`
    ${({ theme }) => `
    cursor: pointer;
    background-color: #51bc51;
    color: #FFF;
    transition: ${theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.standard,
    })};
    &:hover {
      background-color: #1f7a1f;
      transform: scale(1.3);
    }
    `}
  `;

    const questions = React.useMemo(() => [
		{
<<<<<<< HEAD
			questionText: 'What are you particularly good at?',
=======
			id: 1,
>>>>>>> origin
			answerOptions: [
				{ answerText: 'Option 1' },
				{ answerText: 'Option 2' },
				{ answerText: 'Option 3'},
				{ answerText: 'Option 4'},
			],
		},
		{
<<<<<<< HEAD
			questionText: 'What are you most passionate about?',
=======
			id: 2,
>>>>>>> origin
			answerOptions: [
				{ answerText: 'Option 1' },
				{ answerText: 'Option 2' },
				{ answerText: 'Option 3' },
				{ answerText: 'Option 4' },
			],
		},
		{
<<<<<<< HEAD
			questionText: 'What would make my life feel the most meaningful?',
=======
			id: 3,
>>>>>>> origin
			answerOptions: [
				{ answerText: 'Option 1' },
				{ answerText: 'Option 2' },
				{ answerText: 'Option 3' },
				{ answerText: 'Option 4' },
			],
		},
		{
<<<<<<< HEAD
			questionText: 'What kind of impact would I want to have on the world with my work?',
=======
			id: 4,
>>>>>>> origin
			answerOptions: [
				{ answerText: 'Option 1' },
				{ answerText: 'Option 2' },
				{ answerText: 'Option 3' },
				{ answerText: 'Option 4' },
			],
		},
        {
<<<<<<< HEAD
			questionText: 'What do I enjoy most in life? What do I enjoy so much that I lose track of time?',
=======
			id: 5,
>>>>>>> origin
			answerOptions: [
				{ answerText: 'Option 1' },
				{ answerText: 'Option 2' },
				{ answerText: 'Option 3' },
				{ answerText: 'Option 4' },
			],
		},
        {
<<<<<<< HEAD
			questionText: 'What fields am I most interested in? (doesnt have to be related to school.)',
=======
			id: 6,
>>>>>>> origin
			answerOptions: [
				{ answerText: 'Option 1' },
				{ answerText: 'Option 2' },
				{ answerText: 'Option 3' },
				{ answerText: 'Option 4' },
			],
		},
        {
<<<<<<< HEAD
			questionText: 'How can I add value to the marketplace? With what skills?',
=======
			id: 7,
>>>>>>> origin
			answerOptions: [
				{ answerText: 'Option 1' },
				{ answerText: 'Option 2' },
				{ answerText: 'Option 3' },
				{ answerText: 'Option 4' },
			],
		}
	], []);    

    const [goToHomePage, setGoToHomePage] = React.useState(false);
    const [inputText, setInputText] = React.useState("");
    const [goToBasicQuestionsPage, setGoToBasicQuestionsPage] = React.useState(false);
    const [displayFinishButton, setDisplayFinishButton] = React.useState(false);
    const [displayFinalResults, setDisplayFinalResults] = React.useState(false);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [responses, setResponses] = React.useState<Responses>({});
    const [checked, setChecked] = React.useState(false);
    
    const [inputClicked, setInputClicked] = React.useState(false);
    const [inputFocused, setInputFocused] = React.useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
      const { value } = e.target;
      setResponses({ ...responses, [questions[currentQuestion].id]: value });
    };

    React.useEffect(() => {
        setInputText(responses[questions[currentQuestion]?.id] || ""); // Set input text based on previous response or an empty string
    }, [currentQuestion, questions, responses]);
      

    const handleCurrentQuestion = () => {
        setInputText("");
        setInputClicked(false); 
        setInputFocused(false);
        const currentQuestionIndex = currentQuestion + 1;

            if (currentQuestionIndex < questions.length) {
                setCurrentQuestion(currentQuestionIndex)
            }
    
            if (currentQuestionIndex === questions.length - 1) {
                setDisplayFinishButton(true);
            }
    
    }

    const handlePreviousQuestion = () => {
        setInputText("");
        const previousQuestionIndex = currentQuestion - 1;
    
        if (previousQuestionIndex >= 0) {
            setCurrentQuestion(previousQuestionIndex);
        }
    
        if (previousQuestionIndex !== questions.length - 1) {
            setDisplayFinishButton(false);
        }
    };

    const handleDisplayFinalResults = () => {
        setChecked(true);
        setDisplayFinalResults(true);
        setDisplayFinishButton(false);
    }

    const handleRetakeTest = () => {
        setCurrentQuestion(0); // Reset current question to start from the beginning
        setDisplayFinalResults(false); // Hide final results
        setInputText(""); // Clear input text if any
        // Reset any other state variables as needed
        setResponses({});
        setChecked(false);
    };

    const handleClearText = () => {
        setInputText("");
        setResponses({...responses, [questions[currentQuestion].id]: ""})
    };

    const handleGoToHomePage = () => {
        setGoToHomePage(true);
    };

    if (goToHomePage) {
        return <Navigate to="/" />;
    }

    if (goToBasicQuestionsPage) {
        return <Navigate to="/BasicQuestionsPage"/>
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>CareerFinder4U</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                <Nav.Link onClick={handleGoToHomePage}>Home</Nav.Link>
                <Nav.Link onClick={() => {setGoToBasicQuestionsPage(true)}}>Basic Questions Page</Nav.Link>
                     <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <p></p>
            <h1 className='padding3'>Detailed Questions Page</h1>
            <p className="text-muted">The detailed career assessment goes in depth to plan out your professional preferences, skills, and motivators. Completing this assessment will provide you with a complex overview of career paths that align with your detailed profile. Coming soon.  </p>
            
            <main className="padding2">
            <div
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40vh', 
                padding: '30vh'
            }}>
                
                <Card variant="plain" sx={{ width: 1000, height: 400}}
                >
                    <CardContent>
                        {!displayFinalResults && <Typography level="title-md">Question {currentQuestion+1}/{questions.length}</Typography>}
                        {!displayFinalResults && <ProgressBar
                            min={0} 
                            now={(currentQuestion + 1) * (100 / questions.length)}
                            max={100} 
                            label={`${Math.round(((currentQuestion + 1) * (100 / questions.length)))}%`} 
                            visuallyHidden={true} 
                            striped={currentQuestion >= 0} 
                            animated={currentQuestion >= 0}
                            variant="info" 
                            style={{ width: '100%'}}
                            >
                        </ProgressBar>}
                        <Typography style={{alignItems: 'center', padding: '5vh'}}>{!displayFinalResults && <div>
                        <p>{questions[currentQuestion].id}</p>
                        <div style={{paddingBottom: '1vh', display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                            {/*<input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />*/}
                            <FormControl error={inputText==='' && inputClicked && !inputFocused}>
                            <Input sx={{width: '500px', height: '75px', display: 'flex',
                                    justifyContent: 'center',

                                    alignItems: 'center',
                                    '--Input-focusedInset': 'var(--any, )',
                                    '--Input-focusedThickness': '0.25rem',
                                    '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
                                    '&::before': {
                                      transition: 'box-shadow .15s ease-in-out',
                                    },
                                    '&:focus-within': {
                                      borderColor: '#86b7fe',
                                    }}} 
                                    variant="outlined" placeholder="Type in here…" value={inputText} 
                                    onClick={() => setInputClicked(true)}
                                    onFocus={() => setInputFocused(true)}
                                    onBlur={() => setInputFocused(false)}
                                    onChange={handleInputChange}
                                    

                                    //error
                                    error={inputText==='' && inputClicked && !inputFocused}
                                    
                                    
                                    />
                                    {inputText === '' && inputClicked && !inputFocused && (
                                        <FormHelperText>
                                            <InfoOutlined/>
                                            Please enter an answer.
                                        </FormHelperText>
                                    )}
                                   
                                </FormControl>
                                {/*<p>{questions[currentQuestion].id}</p>
                                <p>:</p>
                                <p>{responses[questions[currentQuestion].id]}</p>*/}
                                {/*<p>{inputText}</p>*/}
                                
                        </div>
                        <div style={{paddingTop: '1vh'}}><StyledButton onClick={handleClearText}>Reset</StyledButton></div>
                        
                        </div>}

                        {}
                        {!displayFinishButton && !displayFinalResults && (
                            <div style={{ padding: '6vh', display: 'flex', justifyContent: 'center' }}>
                            {currentQuestion > 0 && (<StyledButton onClick={handlePreviousQuestion} style={{ margin: '0 auto' }}>Previous Question</StyledButton>)}
                            <StyledButton onClick={handleCurrentQuestion} style={{ margin: '0 auto' }} disabled={inputText === ''}>Next Question</StyledButton>
                            </div>
                        )}

                        <Grow in={checked}
                            {...(checked ? { timeout: 1500 } : {})}>
                            <div>{displayFinalResults && <div>Final Results!</div>}</div>
                        </Grow>

                        {displayFinalResults && (
                            <div style={{ paddingTop: '15.5rem', textAlign: 'center' }}> {/* Adjust paddingTop to lower the button */}
                            <div style={{ marginBottom: '15vh' }}><StyledButton onClick={handleRetakeTest}
                             // Adjust marginBottom to lower the button
                            >Retake Test
                            </StyledButton></div>
                            </div>
                        )}

                        {}
                        {displayFinishButton && !displayFinalResults && (
                            <div style={{ padding: '8vh', display: 'flex', justifyContent: 'center' }}>
                            <StyledButton onClick={handlePreviousQuestion} style={{ margin: '0 auto' }}>Previous Question</StyledButton>
                            <StyledButton2 color='success' onClick={handleDisplayFinalResults} style={{ margin: '0 auto' }}>Finish & Get Results</StyledButton2>
                            </div>
                        )}
                        </Typography>
                    </CardContent>
                </Card>
                <p></p>
            </div>  
            </main>
        </div>
    );
}