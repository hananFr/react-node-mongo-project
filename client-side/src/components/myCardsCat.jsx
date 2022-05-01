import React, { useState } from "react";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function MyCatCards(props) {
  const [cards, setCards] = useState([]);

  let { id } = useParams(props)


  const setCatData = async () => {
    let { data } = await Axios.get(`http://localhost:3900/api/cards/category/${id}`)
    setCards(data)
  }

  useEffect(() => {
    setCatData()
  }, [])

  if (cards) {



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
  else { return null }
}

export default MyCatCards;