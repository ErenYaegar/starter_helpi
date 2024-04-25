import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { Home } from './components/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { BasicQuestionsPage } from './components/BasicQuestionsPage';
import { DetailedQuestionsPage } from './components/DetailedQuestionsPage';

// test comment
//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/BasicQuestionsPage" element={<BasicQuestionsPage />}/>
          <Route path="/DetailedQuestionsPage" element={<DetailedQuestionsPage />}/>
        </Routes>
      </HashRouter>
      {/* Footer with API key input field */}
      <footer style={{ backgroundColor: '#f3e5f5', padding: '10px', position: 'fixed', bottom: '0', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: '1', textAlign: 'left', marginLeft: '10px', fontSize: '12px'}}>
          <p>© 2024 CareerFinder4U. All rights reserved.</p>
        </div>
        <div style={{ flex: '1', textAlign: 'right', fontSize: '12px' }}>
          <Form>
            <Form.Label style={{ display: 'inline-block', marginRight: '5px', fontSize: '12px' }}>API Key:</Form.Label>
            <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} style={{ display: 'inline-block', marginRight: '5px', width: '150px', height: '30px', fontSize: '12px' }} />
            <Button className="Submit-Button" onClick={handleSubmit} style={{ fontSize: '12px' }}>Submit</Button>
          </Form>
        </div>
      </footer>
    </div>
  );
}

export default App;
