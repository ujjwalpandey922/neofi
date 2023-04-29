import "./modal.css";
import search from "../assets/search.png";
import Selected from "../assets/Selected.png";
import { useState } from "react";

const Model = ({
  setOpen,
  coinInfo,
  setCoinInfo,
  coinSelected,
  setCoinSelected,
}) => {
  const [searchInfo, setSearchInfo] = useState("");
  const handleClick = (e) => {
    setCoinSelected(e);
    setOpen(false);
  };
 

  const filteredItems = coinInfo.filter((singleCoin) =>
    singleCoin.name.toLowerCase().includes(searchInfo.toLowerCase())
  );
  return (
    <div className="container">
      <div className="wrapper">
        <div className="close" onClick={() => setOpen(false)}>
          X
        </div>
        <div className="model-content">
          <div className="search">
            <img src={search} alt="search" />
            <input
              type="text"
              placeholder="Search chains"
              onChange={(e)=> setSearchInfo(e.target.value)}
              value={searchInfo}
            />
          </div>
          <div className="coins-list">
            {filteredItems.map((singleCoin) => (
              <div
                className="modal-info modal-info-extra selected-coin"
                key={singleCoin.id}
                onClick={() => handleClick(singleCoin)}
              >
                <img src={singleCoin.image} alt="smaller-icon" />
                <span>{singleCoin.name}</span>
                {singleCoin.id === coinSelected.id && (
                  <img
                    src={Selected}
                    alt="selected"
                    className="selected-mark"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
