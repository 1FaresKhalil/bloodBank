import { useState } from 'react';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
} from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import Loading from '@/components/loading';
import ErrorPage from '@/components/error';
type Message = {
  username: string;
  sender: string;
  text: string;
};
const ChatPage = () => {
  let token: string | null = '';
  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem('token');
  }
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

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
    },
    { dedupingInterval: 60000 } // Make a new request every 60 seconds
  );
  const { data: userConverstions } = useSWR(
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
    },
    { dedupingInterval: 60000 } // Make a new request every 60 seconds
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
    },
    { dedupingInterval: 60000 } // Make a new request every 60 seconds
  );

  const { data: chatMessages } = useSWR(
    chatId
      ? `${process.env.NEXT_PUBLIC_DB_URI}/website/message/${chatId}`
      : null,
    async (url: any) => {
      // console.log(chatId);
      if (!token) {
        throw new Error('Token not found');
      }
      setLoading(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.data.result);
      let newMessage = response.data.result.map((chat: any) => {
        return {
          username: users?.find((user: any) => user._id === chat.sender)?.name,
          sender: chat.sender,
          text: chat.text,
        };
      });
      setMessages([...newMessage]);
      // console.log(newMessage);
      setLoading(false);
      return newMessage;
    },
    { dedupingInterval: 60000 } // Make a new request every 60 seconds
  );
  const handleUserSelect = async (user: any) => {
    setLoading(true); // set the loading state to true
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
    setLoading(false); // set the loading state to false once the API call is completed
    return response.data.result;
  };
  const handleMessageSend = () => {
    if (selectedUser !== '' && messageInput !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: profile?.user?.name,
          sender: profile?.user?._id,
          text: messageInput,
        },
      ]);
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
      <Box
        className="px-[1vw]"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
        }}
      >
        <Box sx={{ flex: '1 0 25%', borderRight: '1px solid #e0e0e0' }}>
          <List>
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
              ?.filter((user) => user._id !== profile.user._id)
              .map((user) => (
                <ListItem
                  key={user._id}
                  button
                  selected={selectedUser === user._id}
                  onClick={() => handleUserSelect(user)}
                >
                  <ListItemAvatar>
                    <Avatar src="/user2.jpg" alt={user.name} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
          </List>
        </Box>
        <Box sx={{ flex: '1 0 75%', display: 'flex', flexDirection: 'column' }}>
          {selectedUser !== null && (
            <Box
              className="relative"
              sx={{ flexGrow: 1, overflowY: 'scroll', p: 2 }}
            >
              {' '}
              {loading ? (
                <Loading text="loading" /> // render a loading spinner or message
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
                            message.sender === profile.user._id
                              ? '#e0e0e0'
                              : '#2196f3',
                          color:
                            message.sender === profile.user._id
                              ? '#424242'
                              : '#ffffff',
                        }}
                      >
                        <Typography variant="body2">
                          {message.username || profile?.user?.name}
                        </Typography>
                        <Typography variant="body1">{message.text}</Typography>
                      </Box>
                    </Box>
                  ))
              )}
              <Box className="absolute bottom-[3%] w-full" sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      placeholder="Type a message"
                      value={messageInput}
                      onChange={(event) => setMessageInput(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={handleMessageSend}>
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
          {selectedUser === null && (
            <div className="font-size-32 h-screen flex justify-center items-center">
              <h2>Select any user to start chatting!</h2>
            </div>
          )}
        </Box>
      </Box>
    );
  }
  return <Loading text="Loading" />;
};

export default ChatPage;
