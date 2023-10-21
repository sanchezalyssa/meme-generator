import { useState, useEffect } from "react"

export default function Form() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/3si4.jpg",
    })
    // eslint-disable-next-line no-unused-vars
    const [allMemeImages, setAllMemeImages] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setAllMemeImages(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomIndex = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomIndex].url //change the initial value of useState to memesArray[randomIndex].url => memesArray20.url
        setMeme((prevState) => ({
            ...prevState, //will return all the object
            randomImage: url, //will change the randomImage to random url from url
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }))
    }

    return (
        <main className="container">
            <div
                id="form"
                className="form">
                <div className="form-inputs">
                    <input
                        type="text"
                        placeholder="Top  text"
                        id="top-text"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Bottom text"
                        id="bottom-text"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="btn"
                    onClick={getMemeImage}>
                    Get a new meme image
                </button>
            </div>
            <div
                className="meme-container"
                id="meme-container">
                <img
                    src={meme.randomImage}
                    alt="random meme image"
                    className="meme-image"
                />
                <div className="memeText-container">
                    <h4 className="memeText top">{meme.topText}</h4>
                    <h4 className="memeText bottom">{meme.bottomText}</h4>
                </div>
            </div>
        </main>
    )
}
