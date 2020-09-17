import React, {useEffect, useState} from 'react';
import Message from "./components/Message";
import FlipMove from "react-flip-move";
import {Input, InputLabel, IconButton, FormControl} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import Form from "./components/Form";
import storage from "./helpers/storage";
import scrollToEndPage from "./helpers/scrollToEndPage";
import './App.css';


function App() {
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([
    {id: 1, username: 'Steve', text: 'Hello world'},
    {id: 2, username: 'Mike', text: 'Hi, all'},
    {id: 3, username: 'Макс', text: 'Hi, all'},
    {id: 4, username: 'Steve', text: 'Hi, all'},
    {id: 5, username: 'Макс', text: 'Hi, all'},
    {id: 6, username: 'Mike', text: 'Hi, all'},
    {id: 7, username: 'Макс', text: 'Hi, all'},
  ])

  useEffect(() => {
    const STORAGE_NAME = 'username'
    const localeUsername = storage(STORAGE_NAME) || null
    if (localeUsername) {
      setUsername(localeUsername)
    } else {
      setUsername(prompt('Укажите свой никнейм или имя'))
    }
  }, [])

  useEffect(() => {
    scrollToEndPage()
  }, [])

  const sendMessage = event => {
    event.preventDefault()
    setMessages([...messages, {id: messages.length, username, text: input}])
    setInput('')
  }

  return (
    <div className="App">
      <img src={"logo.png"} alt="logo" width={100} height={100}/>
      <h1>Facebook messenger</h1>
      <h2>Welcome {username}</h2>

      <Form onSubmit={sendMessage} className={`sendMessage__form`}>
        <FormControl className={"sendMessage_control"}>
          <InputLabel htmlFor="input">Введите сообщение...</InputLabel>
          <Input
            id={"input"}
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
            className={"sendMessage__input"}
          />
          <IconButton
            type={"submit"}
            disabled={!input}
            color={'primary'}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </Form>

      <FlipMove>
        {
          messages.map(message => (
            <Message
              key={message.id}
              message={message}
              username={username}
            />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
