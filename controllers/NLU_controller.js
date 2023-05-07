import BaseDeDatos from "../dao/BaseDeDatos.js";
import logger from "../logger.js";

let baseDeDatos = new BaseDeDatos();

const get_nlu_structure = async (req, res, next) => {
    
    const nlu_structure = await baseDeDatos.get_nlu_structure();

    /*logger.log({
        level: 'info',
        message: req.user.email + " solicita todas las estructuras."
    });*/

    try {
        res.send(nlu_structure);
    } catch (error) {

        logger.log({
            level: 'error',
            message: error.name
        });

        res.status(500).send(error);
    }
}

// hay que agregar esta función para que busque por nombre
const get_nlu_structure_name = async (req, res, next) => {

    /*logger.log({
        level: 'info',
        message: req.user.email + " solicita la estructura con nombre: " + req.query.name + "."
    });*/

    try {
        const nlu_structure = await baseDeDatos.get_nlu_structure_name(req.query.name);
        res.send(nlu_structure);

        if(nlu_structure === null) {

            logger.log({
                level: 'error',
                message: 'Error: no existe una estructura con el nombre: ' + req.query.name + '.'
            });
        }

    } catch (error) {

        logger.log({
            level: 'error',
            message: error.name
        });

        res.status(500).send(error);
    }
}

const add_nlu_structure = async (req, res, next) => {

    /*logger.log({
        level: 'info',
        message: req.user.email + " solicita agregar una nueva estructura con nombre: " + req.query.name + " y texto: " + req.query.text + "."
    });*/


    try {
        const nlu_structure = await baseDeDatos.add_nlu_structure(req.query.name, req.query.text)
        res.send(nlu_structure);
    } catch (error) {

        logger.log({
            level: 'error',
            message: error.name
        });

        res.status(500).send(error);
    }
}

const put_nlu_structure = async (req, res, next) => {

    /*logger.log({
        level: 'info',
        message: req.user + " solicita editar la estructura con id: " + req.params.id + " a la estructura con nombre: " + req.query.name + " y texto: " + req.query.text + "."
    });*/

    try {
        //Imprime el mail de quien edita:
        console.log(req.user);

        const nlu_structure = await baseDeDatos.put_nlu_structure(req.params.id, req.query.name, req.query.text);
        res.send(nlu_structure);
    } catch (error) {

        logger.log({
            level: 'error',
            message: error.name
        });

        res.status(500).send(error);
    }
}

const delete_nlu_structure = async (req, res, next) => {

    /*logger.log({
        level: 'info',
        message: req.user + " solicita eliminar la estructura con id: " + req.params.id + "."
    });*/

    try {
        const nlu_structure = await baseDeDatos.delete_nlu_structure(req.params.id);
    
        if (!nlu_structure) {
            return res.status(404).send("No item found");
        }
        return res.status(200).send(nlu_structure);
    } catch (error) {
    
        logger.log({
            level: 'error',
            message: error.name
        });
    
        return res.status(500).send(error);
    }
}

const logout = (req, res, next) => {

    /*logger.log({
        level: 'info',
        message: req.user.email + " ha cerrado sesión."
    });

    req.logOut()
    res.clearCookie("token");
    res.redirect("http://localhost:3000/");
    console.log(`-------> User Logged out`);*/
}

const get_nlu_assembly = async (req, res, next) => {

    logger.log({
        level: 'info',
        message:
            req.user.email + " solicita el siguiente montaje: " + 
            req.query.intent + " (intent), " +
            req.query.entity + " (entity), " +
            req.query.role + " (role), " +
            req.query.trait + " (trait)."
    });

    try {
        const nlu_structure_intent = await baseDeDatos.get_nlu_structure_name(req.query.intent);

        if(nlu_structure_intent === null)
            logger.log({ level: 'error', message: 'Error: no existe una estructura con el nombre: ' + req.query.intent + '.' });

        const nlu_structure_entity = await baseDeDatos.get_nlu_structure_name(req.query.entity);

        if(nlu_structure_entity === null)
            logger.log({ level: 'error', message: 'Error: no existe una estructura con el nombre: ' + req.query.entity + '.' });

        const nlu_structure_role = await baseDeDatos.get_nlu_structure_name(req.query.role);

        if(nlu_structure_role === null)
            logger.log({ level: 'error', message: 'Error: no existe una estructura con el nombre: ' + req.query.role + '.' });

        const nlu_structure_trait = await baseDeDatos.get_nlu_structure_name(req.query.trait);

        if(nlu_structure_trait === null)
            logger.log({ level: 'error', message: 'Error: no existe una estructura con el nombre: ' + req.query.trait + '.' });

        const nlu_assembly = {
            intent: nlu_structure_intent,
            entity: nlu_structure_entity,
            role: nlu_structure_role,
            trait: nlu_structure_trait
        }

        res.send(nlu_assembly);

    } catch (error) {

        logger.log({
            level: 'error',
            message: error.name
        });

        res.status(500).send(error);
    }
}

export {
    get_nlu_structure,
    add_nlu_structure,
    put_nlu_structure,
    delete_nlu_structure,
    logout,
    get_nlu_structure_name,
    get_nlu_assembly
}

/* https://github.com/dracero/node-express-mongo */
