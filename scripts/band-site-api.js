class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/comments/"
    }

    async postComment(comment) {
        
        try {
                const response = await fetch(`${this.baseUrl}?api_key=${this.apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: comment.name, 
                    comment: comment.commentText 
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to post the comment.");
            }
            return await response.json();
        } 
        catch(error) {
            console.error("Error posting the comment:", error);
            throw error;
        }
    }

    async getComments () {
        const url = `${this.baseUrl}?api_key=${this.apiKey}`;
        try {
            const response = await axios.get(url);
            return response.data.sort ((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error ("Error posting the comment:", error);
            throw new Error("Failed to post the comment.");
            }
    }
    async getShows (){
        const url = `${this.baseUrl}?api_key=${this.apiKey}`;
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