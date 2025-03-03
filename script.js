document.addEventListener("DOMContentLoaded", async () => {
    const SPACE_ID = "oiizdl2hit49";
    const ACCESS_TOKEN = "d52UXnSpkBiPAzeHHSMwO2vHa9vxDIa7WYyN4GcskXg";
    const ENTRY_ID = "14xVKA4V20B5oxVvSAVCWc";

    const API_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${ENTRY_ID}?access_token=${ACCESS_TOKEN}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Extract content
        const title = data.fields.title;
        const content = data.fields.content.content[0].content[0].value; // Extract text from rich text format
        const publishedDate = new Date(data.fields.publishedDate).toDateString();
        const imageId = data.fields.image.sys.id;

        // Fetch the image URL
        const imageURL = await fetchImage(SPACE_ID, ACCESS_TOKEN, imageId);

        // Display content dynamically
        document.getElementById("blog-container").innerHTML = `
            <h2>${title}</h2>
            <p><strong>Published on:</strong> ${publishedDate}</p>
            <img src="${imageURL}" alt="${title}" style="width: 100%; max-width: 400px;">
            <p>${content}</p>
        `;

    } catch (error) {
        console.error("Error fetching blog post:", error);
    }
});

// Function to fetch image URL from asset ID
async function fetchImage(spaceId, accessToken, assetId) {
    const imageURL = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/assets/${assetId}?access_token=${accessToken}`;
    try {
        const response = await fetch(imageURL);
        const data = await response.json();
        return `https:${data.fields.file.url}`;
    } catch (error) {
        console.error("Error fetching image:", error);
        return "";
    }
}
