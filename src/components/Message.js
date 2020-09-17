import React , {forwardRef} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import './Message.css'

const Message = forwardRef(({username, message}, ref) => {
  const isUser = username === message.username
  return (
    <div ref={ref} className={`message ${isUser && 'message__User'}`}>
      <Card className={isUser ? "messageCard__user" : 'messageCard__quest'}>
        <CardContent>
          <Typography className="message__Title" color="textSecondary" gutterBottom>
            {!isUser && `${message.username || 'Неизвестный пользователь'}`}
          </Typography>
          <Typography variant="h5" component="h2">
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
