class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/comments/";
        this.baseShowUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/showdates/";
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
                    comment: comment.comment 
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
            console.error ("Error getting the comment:", error);
            throw new Error("Failed to get the comment.");
            }
    }
    async getShows (){
        const url = `${this.baseShowUrl}?api_key=${this.apiKey}`;
        try {
            const response = await axios.get(url);
            return response.data;
        }
        catch (error) {
            console.error ("Error fetching the shows:", error);
            throw new Error("Failed to fetch the shows.");
        }
    }
}
export default BandSiteApi;