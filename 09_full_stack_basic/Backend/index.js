import "dotenv/config";
import express from "express";
const app = express();
app.listen(process.env.PORT, () => {
    console.log(`Server is starting at http://localhost:${process.env.PORT}`);
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/api/jokes", (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "Tech Joke",
            content: "Why do programmers prefer dark mode? Because light attracts bugs!",
        },
        {
            id: 2,
            title: "Math Joke",
            content: "Why was the equal sign so humble? Because he realized he wasn't less than or greater than anyone else.",
        },
        {
            id: 3,
            title: "Computer Joke",
            content: "Why was the computer cold? It left its Windows open!",
        },
        {
            id: 4,
            title: "Science Joke",
            content: "What did the biologist wear to impress their date? Designer genes!",
        },
        {
            id: 5,
            title: "Geometry Joke",
            content: "Why did the triangle refuse to go to the party? Because it couldn't handle the angles!",
        },
        {
            id: 6,
            title: "Science Joke",
            content: "What did the biologist wear to impress their date? Designer genes!",
        }
    ];
    res.json(jokes);
});
