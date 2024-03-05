import { Schema, model } from "mongoose";

const AnimeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    watchLink: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed'],
        required: true,
    },
    studio: {
        type: String,
        required: true,
    },
    episodes: {
        type: Number,
        required: true,
    },
    episodeDuration: {
        type: Number,
        required: true,
    },
    release: {
        type: Number,
        required: true,
    },
    genre: [{
        type: String,
        required: true,
    }],
    artist: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: []
    }]
}, {
    timestamps: true
})

const Anime = model('Anime', AnimeSchema);

export default Anime;

