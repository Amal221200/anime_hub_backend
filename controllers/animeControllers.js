import Anime from "../models/animeModel.js";

const validateAnime = (anime) => {
    const { title, artist, release, watchLink, status, studio, episodes, episodeDuration, genre, imageLink } = anime;
    const exp = title && artist && release !== undefined && watchLink && status && studio && episodes !== undefined && episodeDuration !== undefined && genre && genre.length > 0 && imageLink
    return Boolean(exp);
}
export const getAnimes = async (req, res) => {
    try {
        const title = req.query?.title
        const animes = await Anime.find(title ? { title: { $regex: new RegExp(title, 'i') } } : {}).limit(15).sort({ title: 1 });
        return res.json(animes)
    } catch (error) {
        return res.status(500).json("Internal Server Error")
    }
}

export const getAnime = async (req, res) => {
    try {

        const id = req.params.id
        const anime = await Anime.findById(id).populate('reviews');

        if (!anime) {
            return res.status(404).json("Anime not found");
        }

        return res.json(anime)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error")
    }
}

export const addAnime = async (req, res) => {

    try {
        const body = req.body;
        const validate = validateAnime(body);

        if (!validate) {
            return res.status(400).json("Please enter all the fields");
        }

        const anime = new Anime(
            {
                title: body.title,
                status: body.status,
                studio: body.studio,
                imageLink: body.imageLink,
                watchLink: body.watchLink,
                release: body.release,
                episodes: body.episodes,
                episodeDuration: body.episodeDuration,
                artist: body.artist,
                genre: body.genre,
                description: body.description,
            }
        );
        
        await anime.save()
        return res.status(201).json(anime);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error")
    }
}

export const editAnime = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body;
        const animeExist = await Anime.findById(id);

        if (!animeExist) {
            return res.status(404).json("Anime not found");
        }

        animeExist.$set({
            title: body?.title || animeExist.title,
            description: body?.description || animeExist.description,
            genre: body?.genre || animeExist.genre,
            studio: body?.studio || animeExist.studio,
            watchLink: body?.watchLink || animeExist.watchLink,
            imageLink: body?.imageLink || animeExist.imageLink,
            status: body?.status || animeExist.status,
            release: body?.release || animeExist.release,
            episodeDuration: body?.episodeDuration || animeExist.episodeDuration,
            episodes: body?.episodes || animeExist.episodes,
            artist: body?.artist || animeExist.artist
        });
        await animeExist.save();
        return res.json(animeExist);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error")
    }
}

export const deleteAnime = async (req, res) => {
    try {
        const id = req.params.id;
        const animeExist = await Anime.findById(id);

        if (!animeExist) {
            return res.status(404).json("Anime not found");
        }

        await animeExist.deleteOne();
        return res.json(animeExist);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error")
    }
}