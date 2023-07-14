import React, { useState, useEffect, useRef } from "react";
//import TextareaAutosize from 'react-textarea-autosize';
import useApi from './../Services/OpenAPIService.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Main() {
  const [message, setMessage] = useState('');
  const { response, getResponse } = useApi();
  const [loading, setLoading] = useState('');
  const myref=useRef(null);

  const [chat, setChat] = useState([]);
  const [options, setOption] = useState(1);
  const [listOptions] = useState([
    { id: 1, desc: "Richard son" },
    { id: 2, desc: "Robby son" },
    { id: 3, desc: "Ellen son" }
  ]);

  function handleSelect(e) {
    const selected = e.target.value;
    setOption(selected);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { text: message, sender: 'user' };
    myref.current.scrollTop+=500;
    setChat(prevChat => [...prevChat, newMessage]);
    getResponse(message);
    setMessage('');
    setLoading(true);
  };

  useEffect(() => {
    if (response) {
      const newResponse = { text: response, sender: 'bot' };
      setChat(prevChat => [...prevChat, newResponse]);
      setLoading(false);

    }
  }, [response]);

  

  return (
    <section class="msger">
       <header class="msger-header">
          <div class="msger-header-title"> <img class='logo' src='../logo.png' alt="" ></img>
            <div class='title'>
            AI Nursery Assistant V 1.00
          </div>
          </div>
          

          <div class='select'>
          <select value={options} onChange={e => handleSelect(e)}>
            {listOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.desc}
              </option>
            ))}
          </select>
          </div>
      </header>
      <hr></hr>
      <main class="msger-chat" ref={myref}>
        <div class="msg left-msg">
           <div  class="msg-img"><img src='../avatar.png' alt=''/></div>
           <div class="msg-bubble">
             <div class="msg-info">
               <div class="msg-info-name">BOT</div>
             </div>

             <div class="msg-text">
               Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
           </div>
           </div>
           
        
      </div> 
      {chat.map((message, i) => (
        <div key={i} class='messagediv'>
           {message.sender === 'user' ? (<div class="msg right-msg">
           <div class="msg-img" > user</div>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">User</div>
            </div>

            <div class="msg-text"> 
           
              <div class="msg-text"  >
                {message.text}
              </div>
           
            </div>
          </div>
        </div> ):( <div class="msg left-msg">
           <div
          class="msg-img"
          ><img src='../avatar.png' alt=''/></div>

          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">BOT</div>
            </div>
            <div class="msg-text"  >
               <pre>
               {message.text}

               </pre>
                
              </div>
          </div>
        </div>)}
      </div>
        ))}
        
      {loading?(<div class="msg left-msg">
           <div  class="msg-img"><img src='../avatar.png' alt=''/></div>
           <div class="msg-bubble">
             <div class="msg-info">
               <div class="msg-info-name">BOT</div>
             </div>

             <div class="msg-text">
             <div class="loader">
              <div class="loader__spinner"></div>
            </div>
           </div>
           </div>
           
        
      </div> ):(<div></div>)}
        
      
      </main>
      <form onSubmit={handleSubmit} class="msger-inputarea">
        <input class='text' type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" class="msger-send-btn"><span> <i className="fas fa-paper-plane blue"></i></span>
        </button>
      
      </form>

     


    
    </section>

   
  );
}

export default Main;
