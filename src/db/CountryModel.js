import BaseModel from "./BaseModel";
import {
    ApplicationError
} from "../lib/errors";

import {
    default as countrySchema
} from "../schemas/country.schema.js";

export default class countryModel extends BaseModel {
    constructor(connection) {
        super("country", connection);
        this.schema = userSchema;
        this.name = "country";
        this.model = this.connection.model(this.name, this.schema);
    }

    async getCountries() {
        try {
            const country = await this.model.find({});
            return country;
        } catch (error) {
            throw new ApplicationError(error, 500, {});
        }
    }
    async updateCountry(countryCode, country) {
        try {
            const updatedCountry = await this.model.findOneAndUpdate({
                countryCode,
            }, {
                $set: country
            }, {
                new: true
            });
            return updatedCountry;
        } catch (error) {
            throw new ApplicationError(error, 500, {});
        }
    }
    async deleteCountry(countryCode) {
        try {
            const deletedCountry = await this.model.findOneAndRemove({
                countryCode,
            }, {
                new: true
            });
            return deletedCountry;
        } catch (error) {
            throw new ApplicationError(error, 500, {});
        }
    }

}