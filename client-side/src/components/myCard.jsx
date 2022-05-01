import React, { useState } from "react";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function MyCards(props) {
  const [cards, setCards] = useState([]);

  const setData = async () => {
    let { data } = await Axios.get('http://localhost:3900/api/cards/my-cards')
    setCards(data);
  }

  useEffect(() => {
    setData();
  }, [])



  return (
    <div className="container">
      <PageHeader titleText="עריכת סיורים" />
      <div className="row">
        <div className="col-12 justify-content-center text-center">
          <p>אתה יכול לערוך כאן את כרטיסי הטיול!</p>
        </div>
      </div>
      <div className="row" dir="rtl">
        {
          cards.map(card => <Card key={card._id} card={card} />)}
      </div>
    </div>
  );
}



export default MyCards;