import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import Loading from '@/components/loading';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type Message = {
  username: string;
  sender: string;
  text: string;
};
const socket = io(`https://chief-honored-mice.glitch.me`, {
  transports: ['websocket'],
});

const ChatPage = () => {
  // const router = useRouter();
  let token: string | null = '';
  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem('token');
  }
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);
  const { data: profile, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/profile`,
    async (url) => {
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.profile.user);
      return response.data;
    }
  );
  // const { data: userConverstions } =
  useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/website/conversation/${profile?.user?._id}`,
    async (url: any) => {
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // here i need to concat the members arrays
      setMembers(response.data.result.flatMap((result: any) => result.members));
      // console.log(response.data.result.map((result: any) => result._id));
      return response.data;
    }
  );

  const { data: users } = useSWR(
    members?.map(
      (member: any) => `${process.env.NEXT_PUBLIC_DB_URI}/admin/users/${member}`
    ),
    async (urls: string[]) => {
      const responses = await axios.all(
        urls.map((url) =>
          axios.get(url, {
            headers: {
              Authorization: `${token}`,
            },
          })
        )
      );
      // console.log(responses.map((response) => response.profile.user));
      return responses.map((response) => response.data.user);
    }
  );

  //  const { data: chatMessages } =
  useSWR(
    chatId
      ? `${process.env.NEXT_PUBLIC_DB_URI}/website/message/${chatId}`
      : null,
    async (url: any) => {
      // console.log(chatId);
      if (!token) {
        throw new Error('Token not found');
      }
      setIsLoadingMessages(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.data.result);
      const newMessage = response.data.result.map((chat: any) => {
        return {
          username: users?.find((user: any) => user._id === chat.sender)?.name,
          sender: chat.sender,
          text: chat.text,
        };
      });
      setMessages([...newMessage]);
      // console.log(newMessage);
      setIsLoadingMessages(false);
      return newMessage;
    },
    {
      revalidateOnFocus: false,
    }
  );
  const handleUserSelect = async (user: any) => {
    // Leave the current room if any
    if (chatId) {
      socket.emit('leave_room', chatId);
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_URI}/website/conversation/find/${user?._id}/${profile?.user?._id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    setChatId(response.data.result._id);
    setSelectedUser(user?._id);

    // Join the new room
    socket.emit('join_room', response.data.result._id);

    return response.data.result;
  };
  const handleMessageSend = () => {
    if (selectedUser !== '' && messageInput !== '') {
      const message = {
        username: profile?.user?.name,
        sender: profile?.user?._id,
        text: messageInput,
      };

      // Remove the following line
      // setMessages((prevMessages) => [...prevMessages, message]);

      socket.emit('message', { chatId, message });
      axios.post(
        `${process.env.NEXT_PUBLIC_DB_URI}/website/message/`,
        {
          conversationId: chatId,
          sender: profile?.user?._id,
          text: messageInput,

          // "sender": "643b696685c62f4d19757cb5",
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setMessageInput('');
    }
  };
  if (error) {
    return <ErrorPage />;
  }
  if (profile?.user) {
    return (
      <Main meta={<Meta title="Chat" description="chat page" />}>
        <Navbar username={profile?.user?.username} />
        <Box
          className="px-[1vw] flex-col lg:flex-row"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <Box
            className="shadow"
            sx={{ flex: '1 0 25%', borderRight: '1px solid #e0e0e0' }}
          >
            <List className="h-16vh overflow-auto">
              <ListItem
                button
                selected={!selectedUser}
                onClick={() => setSelectedUser(null)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pointerEvents: 'none', // Prevent click events
                }}
              >
                <Typography>Chats</Typography>
              </ListItem>
              {users
                ?.filter((user) => user?._id !== profile.user._id)
                .map((user) => (
                  <ListItem
                    key={user?._id}
                    button
                    selected={selectedUser === user?._id}
                    onClick={() => handleUserSelect(user)}
                  >
                    <ListItemAvatar>
                      <Avatar src="/user2.jpg" alt={user?.name} />
                    </ListItemAvatar>
                    <ListItemText primary={user?.name} />
                  </ListItem>
                ))}
            </List>
          </Box>
          <Box
            className="mt-2 lg:mt-0 border border-solid border-[#0000001a]"
            sx={{ flex: '1 0 75%', display: 'flex', flexDirection: 'column' }}
          >
            {selectedUser !== null && (
              <Box
                ref={chatContainerRef}
                className="shadow  "
                sx={{ flexGrow: 1, overflowY: 'scroll', p: 2 }}
              >
                {isLoadingMessages ? (
                  <Loading text="Loading messages" />
                ) : (
                  messages
                    .filter(
                      (message) =>
                        message.sender === profile.user._id ||
                        message.sender === selectedUser
                    )
                    .map((message, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection:
                            message.sender === profile.user._id
                              ? 'row-reverse'
                              : 'row',
                          alignItems: 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Avatar
                          src={
                            message.sender === profile.user._id
                              ? '/user1.jpg'
                              : '/user2.jpg'
                          }
                          alt={
                            // eslint-disable-next-line no-underscore-dangle
                            message.sender === profile.user._id
                              ? profile.user.name
                              : message.username
                          }
                          sx={{ mx: 1 }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 1,
                            px: 2,
                            py: 1,
                            backgroundColor:
                              // eslint-disable-next-line no-underscore-dangle
                              message.sender === profile.user._id
                                ? '#e0e0e0'
                                : '#2196f3',
                            color:
                              // eslint-disable-next-line no-underscore-dangle
                              message.sender === profile.user._id
                                ? '#424242'
                                : '#ffffff',
                          }}
                        >
                          <Typography variant="body2">
                            {message.username || profile?.user?.name}
                          </Typography>
                          <Typography variant="body1">
                            {message.text}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                )}
              </Box>
            )}
            {selectedUser !== null && (
              <Box className="" sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      placeholder="Type a message"
                      value={messageInput}
                      onChange={(event) => setMessageInput(event.target.value)}
                      onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                          handleMessageSend();
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={handleMessageSend}>
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            )}
            {selectedUser === null && (
              <div className="font-size-32 h-screen flex justify-center items-center">
                <h2>Select any user to start chatting!</h2>
              </div>
            )}
          </Box>
        </Box>
      </Main>
    );
  }
  return <Loading text="Loading" />;
};

export default ChatPage;
