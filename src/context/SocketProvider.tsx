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

  useEffect(() => {
    const newSocket = io(serverUrl);
    const randomName = generateRandomName(6);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io");
      console.log("Socket Id", newSocket.id);

      axios.post("/user", {
        name: randomName,
        socket_id: newSocket.id
      });

    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Disconnected From Socket.io");
    };

  }, [serverUrl]);

  return (
    <SocketContext.Provider
      value={socket}>
      {children}
    </SocketContext.Provider>
  );
}