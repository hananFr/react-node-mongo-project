import http from './httpService';
import { apiUrl } from '../config.json';

export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}

export function getMyCards() {
  return http.get(`http://localhost:3900/api/cards/my-cards`);
}





export default { getMyCards, getCard }