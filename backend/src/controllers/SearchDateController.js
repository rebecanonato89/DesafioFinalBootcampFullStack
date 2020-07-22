const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        const yearMonth = await Transaction.distinct('yearMonth').sort({yearMonth : 1});
        return res.json({ yearMonth });
    }
};