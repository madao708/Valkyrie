var Quote = require('../models').Quote;
var utils = require('./utils');

exports.getQuotes = function (req, res) {
  Quote
    .find()
    .limit(20)
    .exec(function (err, quotes) {
      return res.send(quotes);
    });
};

exports.getQuoteByKeyword = function (req, res) {
  var keyword = req.query.kw;

  Quote
    .find({quote: new RegExp('(.*)' + keyword + '(.*)')})
    .limit(20)
    .exec(function (err, quotes) {
      return res.send(quotes);
    });
};

exports.getQuoteById = function (req, res) {
  var quoteId = req.params.quoteId;

  Quote
    .findById(quoteId, function (err, quote) {
      return res.send(quote);
    });
};

exports.getQuotesByCharacterId = function (req, res) {
  var characterId = req.params.characterId;
  var paginationId = req.query.paginationId;

  var options = {
    targetCriteria: {
      character_id: characterId
    },
    nextPageCriteria: {
      character_id: characterId,
      _id: {
        $gt: paginationId
      }
    },
    prevPageCriteria: {
      character_id: characterId,
      _id: {
        $lt: paginationId
      }
    },
    otherPageCriteria: {
      character_id: characterId,
      _id: {
        $gte: paginationId
      }
    }
  };

  return utils.paging(req, res, Quote, options);
};