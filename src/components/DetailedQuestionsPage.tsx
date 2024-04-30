import React, { useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import { styled } from '@mui/material/styles';

export function DetailedQuestionsPage(): JSX.Element {
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

    const questions = [
        { questionText: 'What are you particularly good at?' },
        { questionText: 'What are you most passionate about?' },
        { questionText: 'What would make my life feel the most meaningful?' },
        { questionText: 'What kind of impact would I want to have on the world with my work?' },
        { questionText: 'What do I enjoy most in life? What do I enjoy so much that I lose track of time?' },
        { questionText: 'What fields am I most interested in?' },
        { questionText: 'How can I add value to the marketplace? With what skills?' }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(""));
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [goToHomePage, setGoToHomePage] = useState(false);

    const handleInputChange = (text: string) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = text;
        setAnswers(updatedAnswers);
    };

    const handleSubmitAnswers = async () => {
        if (answers.some(answer => answer.trim() === "")) {
            setError("Please answer all questions before submitting.");
            return;
        }

        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        if (!apiKey) {
            console.error("API key is missing. Make sure REACT_APP_OPENAI_API_KEY is set in your .env file.");
            setError("API key is missing.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant. You will tell me what my top 5 career paths are and why based on all of the questions, and the answers given to you"
                    },
                    ...answers.map(answer => ({
                        role: "user",
                        content: answer
                    }))
                ]
            };

            const headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };

            const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });
            setResponse(response.data.choices[0].message.content);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching GPT-3 response:', error);
            setError("Failed to fetch response from OpenAI");
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleGoToHomePage = () => {
        setGoToHomePage(true);
    };

    if (goToHomePage) {
        return <Navigate to="/" />;
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
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1 className='padding3'>Detailed Questions Page</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', padding: '30vh' }}>
                <Card variant="plain" sx={{ width: 1000, height:400 }}>
                    <CardContent>
                        <Typography level="title-md">Question {currentQuestion + 1} of {questions.length}</Typography>
                        <Input sx={{ width: '500px', height: '75px' }} variant="outlined" placeholder="Type in here…" value={answers[currentQuestion]} onChange={(e) => handleInputChange(e.target.value)} />
                        {currentQuestion < questions.length - 1 ?
                            <StyledButton onClick={handleNextQuestion}>Next Question</StyledButton> :
                            <StyledButton onClick={handleSubmitAnswers} disabled={answers.some(answer => answer.trim() === "")}>Submit Answers</StyledButton>
                        }
                        {currentQuestion > 0 && <StyledButton onClick={handlePreviousQuestion}>Previous Question</StyledButton>}
                        {loading && <Typography>Loading...</Typography>}
                        {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
                        {!loading && response && <Typography>{response}</Typography>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
