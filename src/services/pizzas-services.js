import config from '../../dbconfig.js';
import sql from 'mssql';
import Logger from '../modules/log-helpers.js';

class PizzaService {
    getAll = async (req, res) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Pizzas');
            returnEntity = result.recordsets[0]
            res.json(returnEntity)
        } catch (error) {
            Logger(error.message);
            res.status(500);
            res.send(error.message);
        }
    }

    getById = async (req, res) => {
        const id = req.params.id;
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
            res.json(returnEntity)
        } catch (error) {
            Logger(error.message);
            res.status(500);
            res.send(error.message);
        }
    }

    insert = async (req, res) => {
        const pizza = req.body
        console.log(pizza)
        let rowsAffected = 0;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pNombre', sql.VarChar, pizza.nombre)
                                .input('pLibreGluten', sql.Bit, pizza.libreGluten)
                                .input('pImporte', sql.Int, pizza.importe)
                                .input('pDescripcion', sql.VarChar, pizza.descripcion)
                                .query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');
            rowsAffected = result.rowsAffected;
            res.sendStatus(200)
        } catch (error) {
            Logger(error.message);
            res.status(500);
            res.send(error.message);
        }
    }

    update = async (req, res) => {
        const id = req.params.id;
        const pizza = req.body
        let rowsAffected = 0;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .input('pNombre', sql.VarChar, pizza.nombre)
                                .input('pLibreGluten', sql.Bit, pizza.libreGluten)
                                .input('pImporte', sql.Int, pizza.importe)
                                .input('pDescripcion', sql.VarChar, pizza.descripcion)
                                .query('UPDATE Pizzas SET Nombre = @pNombre, LibreGluten = @pLibreGluten, Importe = @pImporte, Descripcion = @pDescripcion WHERE Id = @pId');

            rowsAffected = result.rowsAffected;
            if (rowsAffected > 0)res.sendStatus(200)
            else res.sendStatus(404)
        } catch (error) {
            Logger(error.message);
            res.status(500);
            res.send(error.message);
        }
    }

    deleteById = async (req, res) => {
        const id = req.params.id;
        let rowsAffected = 0;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('DELETE FROM Pizzas WHERE id = @pId');
            rowsAffected = result.rowsAffected;
            if (rowsAffected > 0)res.sendStatus(200)
            else res.sendStatus(404)
        } catch (error) {
            Logger(error.message);
            res.status(500);
            res.send(error.message);
        }
    }
}

export default PizzaService;