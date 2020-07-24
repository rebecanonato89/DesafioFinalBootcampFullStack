const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy

function formataDate(yearMonthDay){
    return yearMonthDay.split('-');
}

module.exports = {
    async index (req, res) {
        const transaction = await Transaction.find();
        return res.json(transaction);
    },

    async store (req, res) {
        const { 
            description, 
            value, 
            category, 
            yearMonthDay, 
            type 
        } = req.body;

        const date = formataDate(yearMonthDay);
        let transaction = await Transaction.findOne({ description, value, category, yearMonthDay });
        if(!transaction){
            transaction = await Transaction.create({
                description, 
                value, 
                category, 
                year: date[0], 
                month: date[1], 
                day: date[2],
                yearMonth: date[0]+'-'+date[1], 
                yearMonthDay, 
                type });
        }
        return res.json({ transaction });
    },

    async update(req, res){
        const { id } = req.params;
        const { 
            description, 
            value, 
            category, 
            yearMonthDay, 
            type 
        } = req.body;

        const date = formataDate(yearMonthDay);
        try {
            if(id){
                let transaction = await Transaction.findById(id);
                if(transaction){
                    await Transaction.findOneAndUpdate(
                        id,
                        { description, 
                            value, 
                            category, 
                            year: date[0], 
                            month: date[1], 
                            day: date[2],
                            yearMonth: date[0]+'-'+date[1], 
                            yearMonthDay, 
                            type,
                        },
                        {useFindAndModify: false}
                    );
                    return res.json({ transaction });
                }
                return res.json({ message: "Registro não existe!" });
            };
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res){
        const { id } = req.params;
        try{
            const transaction = await Transaction.findById(id);
            if(transaction){
                await Transaction.findById(id).deleteOne();
            }
            return res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }
    }

};