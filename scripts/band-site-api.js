class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/comments/?api_key=40ef9834-e448-42ed-95da-2dd7bb0f2b9f"
    }

    async postComment (comment) {
        const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
        try {
            const response = await axios.post(url, comment, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } 
        catch(error) {
        console.error ("Error posting the comment:", error);
        throw new Error("Failed to post the comment.");
        }
    }

    async getComments () {
        const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
        try {
            const response = await axios.get(url);
            return response.data.sort ((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error ("Error posting the comment:", error);
            throw new Error("Failed to post the comment.");
            }
    }
    async getShows (){
        const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
        try {
            const response = await axios.get(url);
            return response.data;
        }
        catch (error) {
            console.error ("Error posting the comment:", error);
            throw new Error("Failed to post the comment.");
        }
    }
}