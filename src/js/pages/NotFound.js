export default class NotFound {
    constructor() {
        document.title = "404 Not found";
    }
    async getHtml() {
        return `
            <h1>404 Not found</h1>
        `;
    }
}