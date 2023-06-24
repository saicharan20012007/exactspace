import styled from 'styled-components'
import {BiSend} from 'react-icons/bi';
import {GrEmoji} from 'react-icons/gr';
import {AiFillLike} from 'react-icons/ai'

export const MainChatContainer = styled.div`
min-height:100vh;
background-color:  white;
display:flex;
flex-direction:column;
justify-content:flex-end;
`
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  align-self:flex-end;
  justify-self: flex-end;
  position: fixed-bottom;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  height:50px;
  justify-content:space-between;
  margin:30px;
  border-radius:15px;
  cursor:pointer;
`;


export const SearchInput = styled.input`
  border: none;
  outline: none;
  width:85%;
  font-size: 18px;
  margin-left:5px;
`;

export const SearchIcon = styled(BiSend)`
  color: green;
  font-size: 30px;
  align-self:right;
  margin-right:15px;
`;

export const SendContainer = styled.div`
display:flex;
flex-direction:column;
color:green;
align-items:center;`

export const ChatBox = styled.div`
border-color:black;
display:flex;
flex-direction:row;
justify-content:flex-start;
margin:10px;
margin-top:25px;
`

export const NameTime = styled.div`
display:flex;
width:500px;
justify-content:space-between;
`

export const Profile = styled.span`
height:50px;
width:50px;
border-radius:100px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-right:10px;
font-size:16px;
font-weight:700;
`

export const EmojiContainer = styled.div`
  position: relative;
`;

export const EmojiButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  font-size: 20px;
  margin-right: 10px;
`;

export const EmojiPicker = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  max-height: 350px;
  overflow-y: auto;
  z-index: 1;

  span {
    display: inline-block;
    margin: 5px;
    cursor: pointer;
  }
`;


export const EmojiIcon = styled(GrEmoji)`
height:35px;
width:35px;
`

export const MessageParagraph = styled.p`
text-align: left;
margin:0px;
`
export const NM = styled.div`
display:flex;
flex-direction: column;`

export const Name = styled.h3`
font-weight: bold;
margin:0px;`

export const MessageContainer = styled.div`
padding:15px;
margin-top:-20px;
border-radius:12px;
border-top-left-radius:0px;
background-color:#F2F2F2;`

export const LikeIcon = styled(AiFillLike)`
height:20px;
width:20px;`

export const LikeBtn = styled.button`
background-color:transparent;
margin-top:10px;
border-width:0px;
`

export const UsersList = styled.div`
width:100px;
align-self:left;
margin:20px;
border-radius:100px;
margin-left:35px;`

export const User = styled.div`
height:20px;
background-color:lightblue;
margin:10px;
padding:10px;
border-radius:7px;
`