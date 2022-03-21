import BaseDeDatos from "../dao/BaseDeDatos.js";
import logger from "../logger.js";

let baseDeDatos = new BaseDeDatos();

const get_nlu_structure = async (req, res, next) => {
    
    const nlu_structure = await baseDeDatos.get_nlu_structure();

    logger.log({
        level: 'info',
        message: req.user.email + " solicita todas las estructuras."
    });

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

    logger.log({
        level: 'info',
        message: req.user.email + " solicita la estructura con nombre: " + req.query.name + "."
    });

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

    logger.log({
        level: 'info',
        message: req.user.email + " solicita agregar una nueva estructura con nombre: " + req.query.name + " y texto: " + req.query.text + "."
    });


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

    logger.log({
        level: 'info',
        message: req.user + " solicita editar la estructura con id: " + req.params.id + " a la estructura con nombre: " + req.query.name + " y texto: " + req.query.text + "."
    });

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

    logger.log({
        level: 'info',
        message: req.user + " solicita eliminar la estructura con id: " + req.params.id + "."
    });

    try {
        const nlu_structure = await baseDeDatos.delete_nlu_structure(req.params.id);

        if (!nlu_structure) {
            res.status(404).send("No item found");
        }
        res.status(200).send(nlu_structure);
    } catch (error) {

        logger.log({
            level: 'error',
            message: error.name
        });

        res.status(500).send(error);
    }
}

const logout = (req, res, next) => {

    logger.log({
        level: 'info',
        message: req.user.email + " ha cerrado sesión."
    });

    req.logOut()
    res.clearCookie("token");
    res.redirect("http://localhost:3000/")
    console.log(`-------> User Logged out`)
}

export {
    get_nlu_structure,
    get_nlu_structure_name,
    add_nlu_structure,
    put_nlu_structure,
    delete_nlu_structure,
    logout
}
