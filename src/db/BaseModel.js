const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  useNewUrlParser: true,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
import mongoose from "mongoose";
import { configurationFile } from "../lib/config.js";
let mongoUrl= "mongodb://localhost:27017/airtelTest?authMechanism=DEFAULT"


//Below will be dynamic based on the environment
const mongooseDb = mongoose.connect(
  mongoUrl,
  options
);

export default class BaseModel {
  constructor(name, connection) {
    this.name = name;
    if (mongooseDb) {
      this.connection = mongoose.connection;
    }
  }

  async _getModel() {
    this.model = await this.connection.model(this.name, this.schema);
  }
}
