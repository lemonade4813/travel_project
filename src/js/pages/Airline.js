export default class Airline {
    constructor() {
        document.title = "항공권 예약";
    }
    async getHtml() {
        return `
            <h1>항공권 예약 페이지입니다.</h1>
        `;
    }
}