export default class Reservation {
    constructor() {
        document.title = "내 예약 정보";
    }
    async getHtml() {
        return `
            <h1>내가 예약 한 정보 페이지입니다.</h1>
        `;
    }
}