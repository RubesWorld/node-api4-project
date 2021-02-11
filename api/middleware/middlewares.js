const Hubs = require("../hubs/hubs-router");

//*example if it's an empty function
// function logQuote(req, res, next) {
//   console.log("Save money");
//   next();
// }

//* example if it takes argument
const logQuote = (coin) => (req, res, next) => {
  if (
    coin === "dime" ||
    coin === "penny" ||
    coin === "nickel" ||
    coin === "quarter"
  ) {
    console.log(`Save all your ${coin}`);
    next();
  } else {
    res.json("not a valid coin");
  }
};

const checkWord = (req, res, next) => {
  if (req.query && req.query.word && req.query.word == "turd") {
    res.status(404).json(`You can't proceed ${req.query.word} is a bad word`);
  } else {
    next();
  }
};

const checkHubId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hub = await Hubs.findById(id);
    if (!hub) {
      res.status(400).json({ message: "no hub with that id" });
    } else {
      req.hub = hub;
      next();
    }
  } catch (err) {
    res.status(500).json(`server error: ${err}`);
  }
};

const checkMessage = async (req, res, next) => {
  if (!req.body.text || !req.body.sender) {
    res.status(400).json("text and sender required");
  } else {
    next();
  }
};

module.exports = {
  logQuote,
  checkWord,
  checkHubId,
  checkMessage,
};
