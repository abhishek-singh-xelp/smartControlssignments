import mongoose from "mongoose";
import uuid from "uuid";

const Country = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    country: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    }
});

export default Country;