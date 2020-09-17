import React, {useEffect, useState} from 'react';
import Message from "./components/Message";
import FlipMove from "react-flip-move";
import {Input, InputLabel, IconButton, FormControl} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import firebase from "firebase";
import Form from "./components/Form";
import storage from "./helpers/storage";
import scrollToEndPage from "./helpers/scrollToEndPage";
import {db} from "./firebase";
import './App.css';


function App() {
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const STORAGE_NAME = 'username'
    const localeUsername = storage(STORAGE_NAME) || null
    if (localeUsername) {
      setUsername(localeUsername)
    } else {
      const username = prompt('Укажите свой никнейм или имя')
      storage(STORAGE_NAME, username)
      setUsername(username)
    }
  }, [])

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()}
        })
        setMessages(data)
        scrollToEndPage()
      })
  }, [])

  const sendMessage = event => {
    event.preventDefault()
    db.collection('messages').add({
      username,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="App">
      <img src={"logo.png"} alt="logo" width={100} height={100}/>
      <h1>Facebook messenger</h1>
      <h2>Добро пожаловать {username}</h2>

      <Form onSubmit={sendMessage} className={`sendMessage__form`}>
        <FormControl className={"sendMessage_control"}>
          <InputLabel htmlFor="input">Введите сообщение...</InputLabel>
          <Input
            id={"input"}
            type="text"
            value={input}
            onChange={event => setInput(event.target.value.trim())}
            className={"sendMessage__input"}
          />
          <IconButton
            type={"submit"}
            disabled={!input}
            color={'primary'}
          >
            <SendIcon/>
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
