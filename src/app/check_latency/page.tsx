"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "@/context/SocketProvider";

export default function Page() {
  const socket = useSocket();
  const [result, setResult] = useState<number[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [average, setAverage] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handlePong = () => {
      if (startRef.current === null) return;
      const latency = Date.now() - startRef.current;
      setResult((prev) => [...prev, latency]);
    };

    socket.on("pong", handlePong);

    return () => {
      socket.off("pong", handlePong);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [socket]);

  const startLatencyTest = () => {
    if (!socket) return;

    setIsTesting(true);
    setResult([]);
    setAverage(null);

    const testLatency = () => {
      startRef.current = Date.now();
      socket.emit("ping");
    };

    testLatency(); // run immediately once
    intervalRef.current = setInterval(testLatency, 2000);
  };

  const stopLatencyTest = () => {
    setIsTesting(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // calculate average
    if (result.length > 0) {
      const avg = result.reduce((a, b) => a + b, 0) / result.length;
      setAverage(avg);
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start gap-10 pt-40">
      <div>
        {isTesting ? (
          <button
            onClick={stopLatencyTest}
            className="px-4 py-2 rounded bg-red-600 text-white">
            Close Latency
          </button>
        ) : (
          <button
            onClick={startLatencyTest}
            className="px-4 py-2 rounded bg-primary text-white">
            Check Latency
          </button>
        )}
      </div>

      <div className="flex flex-col items-start justify-center gap-2">
        {result.map((latency, index) => (
          <p key={index}>{latency} ms</p>
        ))}

        {average !== null && (
          <p className="pt-4 font-semibold text-lg">
            Average Latency: {average.toFixed(2)} ms
          </p>
        )}
      </div>
    </div>
  );
}
