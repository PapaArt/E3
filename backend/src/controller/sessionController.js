const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const e3 = await connection('e3')
            .where('id', id)
            .select('name')
            .first();
        if (!e3) {
           return response.status(400).json({ error: 'No Inc. found with this ID' }); 
        }

        return response.json(e3); 
    }
}