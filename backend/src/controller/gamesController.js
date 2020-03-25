const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('games').count();

        const games = await connection('games')
            .join('e3', 'e3_id', '=', 'games.e3_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'games.*', 
                'e3.name', 
                'e3.email', 
                'e3.whatsapp', 
                'e3.city', 
                'e3.uf'
            ]);
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(games);
    },
    
    async create(request, response) {
        const {title, description, value} = request.body;
        const e3_id = request.headers.authorization;

        const [id] = await connection('games').insert({
            title,
            description,
            value,
            e3_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const e3_id = request.headers.authorization;

        const games = await connection('games')
            .where('id', id)
            .select('e3_id')
            .first();
        if (games.e3_id != e3_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        
        await connection('games').where('id', id).delete();
        
        return response.status(204).send();
    }
}; 