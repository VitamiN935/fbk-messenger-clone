import React from 'react';


const FormSendMessage = ({onSubmit, className, children}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default FormSendMessage;