const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const e3 = await connection('e3').select('*');
    
        return response.json(e3);
    },

    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;

    const id = generateUniqueId();

    await connection('e3').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({ id });
    }
};