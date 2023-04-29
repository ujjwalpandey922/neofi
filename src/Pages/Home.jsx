import "./home.css";
import blackCircle from "../assets/blackCircle.png";
import Union from "../assets/Union.png";
import down from "../assets/down.png";
import Modal from "../components/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [coinCanBuy, setCoinCanBuy] = useState("");
  const [coinInfo, setCoinInfo] = useState([]);
  const [coinSelected, setCoinSelected] = useState();
  const [latestPrice, setLatestPrice] = useState(0);
  const ws = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=25&page=1&sparkline=false`
      );
      const data = await res.json();
      setCoinInfo(data);
      setCoinSelected(data[0]);
    };
    fetchData();
  }, []);
  useEffect(() => {
    ws.current = new WebSocket(
      `wss://stream.binance.com:9443/ws/${coinSelected?.symbol}usdt@trade`
    );
    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      setLatestPrice(
        parseFloat(data.p * 80)
          .toFixed(2)
          .toLocaleString()
      );
    };
    return () => {
      ws.current.close();
    };
  }, [coinSelected]);
  const handleChange = (e) => {
    setAmount(e.target.value);
    setCoinCanBuy(e.target.value / latestPrice);
  };
  return (
    <div className="Container">
      <div className="card">
        <div className="head">
          <img src={blackCircle} alt="head" className="blackCircle" />
          <img
            src={coinSelected?.image}
            alt="Bitcoin"
            className="bitcoinIcon"
          />
        </div>
        <div className="body">
          <img src={Union} alt="body" className="curve" />
          <div className="details">
            <div className="current-value">
              <p>Current value </p>
              <span>₹ {latestPrice}</span>
            </div>
            <div className="modal-input" onClick={() => setOpen(true)}>
              <div className="modal-info">
                <img src={coinSelected?.image} alt="smaller-icon" />
                <span>{coinSelected?.name}</span>
              </div>
              <img src={down} alt="down" />
            </div>
            <p>Amount you want to invest </p>
            <div className="amount-input">
              <input
                type="text"
                placeholder="0.00"
                onChange={handleChange}
                value={amount}
              />
              <span>INR</span>
            </div>
            <p>
              Estimate Number of {coinSelected?.symbol.toUpperCase(0)} You will
              Get
            </p>
            <div className="amount-input">
              <input
                type="text"
                placeholder="0.00"
                value={coinCanBuy}
                disabled
              />
            </div>
            <button className="buy">Buy</button>
          </div>
        </div>
      </div>
      {open && (
        <Modal
          setOpen={setOpen}
          coinInfo={coinInfo}
          setCoinInfo={setCoinInfo}
          coinSelected={coinSelected}
          setCoinSelected={setCoinSelected}
        />
      )}
    </div>
  );
};

export default Home;
