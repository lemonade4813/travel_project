import Items from "./components/HotelComponent.js";
export default class Hotel {
      
    constructor() {
      const $hotel = document.querySelector('#root');
      new Items($hotel);
    }
  
}
new Hotel();