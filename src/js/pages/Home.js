export default class {
    constructor() {
        document.title = "Home";
    }
    async getHtml() {
        return `
            <h1>홈페이지 입니다.</h1>
        `;
    }
}