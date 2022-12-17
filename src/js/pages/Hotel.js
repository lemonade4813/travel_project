import Items from "./components/HotelComponent.js";
export default class Hotel {
      
    constructor() {
      document.title = '호텔 예약'
      const $hotel = document.querySelector('#root');
      new Items($hotel);
    }
  
}
new Hotel();