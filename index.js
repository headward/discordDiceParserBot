import init from "./init.js";
import diceParser from "./diceParser.js";

const client = init.startClient();
diceParser.init(client);