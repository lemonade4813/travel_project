import Items from "./components/AirlineComponent.js";
export default class Hotel {
      
    constructor() {
      const $airline = document.querySelector('#root');
      new Items($airline);
    }
  
}
new Hotel();
