const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        try{
            const yearMonth = await Transaction.distinct('yearMonth');
            yearMonth.sort();
            yearMonth.reverse();
            return res.status(200).json({ yearMonth });
        } catch (error) {
            res.status(500).send(error);
        }
    }
};