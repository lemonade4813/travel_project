export default class Hotel {
    constructor() {
        document.title = "호텔 예약";
    }
    async getHtml() {
        return `
            <h1>호텔 예약 페이지 입니다.</h1>
        `;
    }
}