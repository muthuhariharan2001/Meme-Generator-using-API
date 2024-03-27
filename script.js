const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");

const updateDetails = (url, title, author) => {
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
}

const generateMeme = async () => {
    try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        if (!response.ok) {
            throw new Error(`Failed to fetch meme. Status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming the response structure has an array of memes, choose one randomly
        const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];

        updateDetails(randomMeme.url, randomMeme.name, randomMeme.author);
    } catch (error) {
        console.error("Error fetching meme:", error);
    }
};

generateMemeBtn.addEventListener("click", generateMeme);
generateMeme();