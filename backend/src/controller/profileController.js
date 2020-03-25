const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const e3_id = request.headers.authorization;

        const games = await connection('games')
            .where('e3_id', e3_id)
            .select('*');
        return response.json(games);
    }
}