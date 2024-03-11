import express  from "express";
import spotifyRouter from "./routes/spotifyRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

//!-----------ROUTES --------------------

app.use("/", spotifyRouter);
app.use("/login", spotifyRouter);
app.use('/callback', spotifyRouter)
app.use('/refresh_token', spotifyRouter)