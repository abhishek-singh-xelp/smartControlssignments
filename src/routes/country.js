import {
    route
} from "./";
import CountryModel from "../db/CountryModel";
import {
    ApplicationError
} from "../lib/errors";
import _ from "lodash";

export const updateCountry = route(async (req, res) => {
    const countryModel = new CountryModel();
    try {
        let countryCode = req.params.countryCode;
        let country = req.body;
        let {
            country
        } = country;
        let newCountry = Object.assign({}, country, {});
        const updatedCountry = await countryModel.updateCountry(countryCode, newCountry);
        res.send({
            results: updatedCountry
        });
    } catch (error) {
        throw new ApplicationError(error, 500, {});
    }
});
export const deleteCountry = route(async (req, res) => {
    const countryModel = new CountryModel();
    try {
        let countryCode = req.params.countryCode;
        const deletedCountry = await countryModel.deleteCountry(countryCode);
        res.send({
            results: deletedCountry
        });
    } catch (error) {
        throw new ApplicationError(error, 500, {});
    }
});
export const getCountryList = route(async (req, res) => {
    const countryModel = new CountryModel();
    try {
        const country = await countryModel.getCountries();
        res.send({
            results: country
        });
    } catch (error) {
        throw new ApplicationError(error, 500, {});
    }
});