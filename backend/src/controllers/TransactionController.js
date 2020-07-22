const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        const transaction = await Transaction.find();
        return res.json(transaction);
    },

    async store (req, res) {
        console.log(req.body);
        const { 
            description, 
            value, 
            category, 
            yearMonthDay, 
            type 
        } = req.body;

        const date = yearMonthDay.split('-');
        const year = date[0];
        const month = date[1];
        const day = date[2];
        const yearMonth = year+'-'+month;

        let transaction = await Transaction.findOne({ description, value, category, yearMonthDay });
        if(!transaction){
            transaction = await Transaction.create({
                description, 
                value, 
                category, 
                year, 
                month, 
                day,
                yearMonth, 
                yearMonthDay, 
                type });
        }
        return res.json({ transaction });
    },

    async update(req, res){
        const id = req.params;
        if(id){
            let transaction = await Transaction.findById({ id });
        };
        if(transaction){

        }
    },

    async delete(req, res){
        const { id } = req.params;

        const transaction = await Transaction.findById(id);

        console.log(transaction);
        if(transaction){
            await Transaction.findById(id).deleteOne();
        }
        return res.status(204).send();
    }

};