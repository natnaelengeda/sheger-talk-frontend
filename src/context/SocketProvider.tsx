import { generateRandomName } from "@/utils/randomNameGenerator";
import
React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io, Socket } from "socket.io-client";

// Axios
import axios from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { login, UserState } from "@/state/user";

const SocketContext = createContext<Socket | null>(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({
  children,
  serverUrl
}: {
  children: React.ReactNode;
  serverUrl: string;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(serverUrl);
    const randomName = generateRandomName(6);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io");
      console.log("Socket Id", newSocket.id);
      console.log(user)

      if (user.isLoggedIn == false) {
        axios.post("/user", {
          name: randomName,
          socket_id: newSocket.id
        }).then(() => {
          axios.post("/online/add-user", {
            userId: randomName,
            socketId: newSocket.id
          });
        });

        dispatch(login({
          userId: randomName,
          socketId: " ",
          isLoggedIn: true
        }))
      }


    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Disconnected From Socket.io");
      axios.patch(`/online/delete-user/${newSocket.id}`)
    };

  }, [serverUrl]);

  return (
    <SocketContext.Provider
      value={socket}>
      {children}
    </SocketContext.Provider>
  );
}