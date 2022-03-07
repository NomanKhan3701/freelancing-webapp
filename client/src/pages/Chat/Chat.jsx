import React from 'react'
import { ChatMain, ChatMiddle, ChatSidebar, Navbar } from '../../components/import'
import './Chat.scss'

const Chat = () => {
  return (
    <div className='chat'>
      <ChatSidebar/>
      <ChatMiddle/>
      <ChatMain/>
    </div>
  )
}

export default Chat