const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        const yearMonth = await Transaction.distinct('yearMonth');
        yearMonth.sort();
        yearMonth.reverse();
        return res.json({ yearMonth });
    }
};