import Items from "./components/HotelComponent.js";
export default class Hotel {
      
    constructor() {
      document.title = 'νΈν μμ½'
      const $hotel = document.querySelector('#root');
      new Items($hotel);
    }
  
}
new Hotel();