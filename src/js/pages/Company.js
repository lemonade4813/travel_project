export default class Company{
    constructor() {
        document.title = "Company";
    }
    async getHtml() {
        return `
            <h1>This is Company Introduce Page</h1>
        `;
    }
}