import { useEffect, useState } from "react";

function IOT() {
  const [data, setData] = useState({
    temperature: "--",
    humidity: "--",
    mq2: "--",
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      setData(incomingData);
    };

    ws.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    return () => ws.close();
  }, []);

  return (
    <div style={styles.page} className="flex flex-col gap-5">
      <h1 className="text-lg font-extrabold">IOT</h1>
      <div className="flex justify-between w-full text-center">
        <div
          /* style={{
            ...styles.box,
            borderColor: "#ff6f61",
            backgroundColor: data.temperature > 20 ? "#ffdddd" : "#fff",
          }} */
          className=""
        >
          <div className="text-[#6b7280]">Temperature</div>
          <h2>{data.temperature} °C</h2>
        </div>
        <div /* style={{ ...styles.box, borderColor: "#6fa8dc" }} */>
          <div className="text-[#6b7280]">Humidity</div>
          <h2>{data.humidity} %</h2>
        </div>
        <div
        /* style={{
            ...styles.box,
            borderColor: "#8bc34a",
            backgroundColor: data.mq2 > 2000 ? "#ddffdd" : "#fff",
          }} */
        >
          <div className="text-[#6b7280]">MQ2</div>
          <h2>{data.mq2}</h2>
        </div>{" "}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "sans-serif",
    marginTop: 20,
  },
  box: {
    border: "2px solid",
    borderRadius: 10,
    padding: 8,
    width: "max-content",
    margin: 10,
    textAlign: "center",
  },
};

export default IOT;
