import Review from "../models/reviewModel.js";
import Anime from "../models/animeModel.js";

export const getReviews = async (req, res) => {
    try {
        const query = req.query
        const reviews = await Review.find(query.anime ? { anime: query.anime  } : {}).populate("user");

        return res.status(200).json(reviews);
    } catch (error) {
        console.log('Add review', error);
        return res.status(500).json("Internal Server Error");
    }
}

export const addReview = async (req, res) => {
    try {
        const user = req.user;
        const body = req.body;

        if (!body.content || !body.anime) {
            return res.status(400).json("Please enter all the inputs");
        }

        const anime = await Anime.findById(body.anime);
        const review = new Review({ content: body.content, user: user._id, anime: req.body.anime });

        await review.save();

        anime.reviews.push(review._id)
        await anime.save();

        return res.status(201).json(review);
    } catch (error) {
        console.log('add review', error);
        return res.status(500).json("Internal Server Error");
    }
}

export const deleteReview = async (req, res) => {
    try {
        
        const id = req.params.id;
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json("Review not found");
        }

        const anime = await Anime.findOne({ reviews: { $in: [review._id] } });

        anime.reviews.pull(review._id);
        await anime.save();
        await review.deleteOne();
        return res.status(200).json(review);

    } catch (error) {
        console.log('delete review', error);
        return res.status(500).json("Internal Server Error");
    }
}