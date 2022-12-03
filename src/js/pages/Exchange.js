export default class Exchange {
    constructor() {
        document.title = "환율 정보";
    }
    async getHtml() {
        return `
            <h1>환율 정보 페이지입니다.</h1>
        `;
    }
}