import { Schema, model } from "mongoose";
import Anime from "./animeModel.js";

const ReviewSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    }
}, {
    timestamps: true
})

// ReviewSchema.pre("deleteOne", async (next) => {
//     await Anime.updateOne({ reviews: { $in: [this._id] } }, { $pull: { reviews: [this._id] } }).exec()
//     next()
// })

const Review = model('Review', ReviewSchema);

export default Review;

