/*
    Notificación
    ruta: '/api/notificacion'
*/
const { Router } = require('express');
const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');

// const { validarJWT } = require('../middlewares/validar-jwt'); 

const {
    crearNotificacion,
    actualizarNotificacion,
    borrarNotificacion,
    getNotificacionById,
    getParams,
    getReportsType
} = require('../controllers/notificacion')


const router = Router();

// router.get( '/', getNotificaciones );
router.get('/get/Reportes',getReportsType)
router.get( '/get/',getParams);

router.post( '/',
    // [
    //     validarJWT,
    //     check('nombre','El nombre del médico es necesario').not().isEmpty(),
    //     check('hospital','El hospital id debe de ser válido').isMongoId(),
    //     validarCampos
    // ], 
    crearNotificacion 
);


router.post( '/:id',
    // [
    //     validarJWT,
    //     check('nombre','El nombre del médico es necesario').not().isEmpty(),
    //     check('hospital','El hospital id debe de ser válido').isMongoId(),
    //     validarCampos
    // ], 
    getNotificacionById 
);


router.put( '/:id',
    // [
    //     validarJWT,
    //     check('nombre','El nombre del médico es necesario').not().isEmpty(),
    //     check('hospital','El hospital id debe de ser válido').isMongoId(),
    //     validarCampos
    // ],
    actualizarNotificacion
);

router.delete( '/:id',
    // validarJWT,
    borrarNotificacion
);

// router.get( '/:id',
//     // validarJWT,
//     getMedicoById
// );



module.exports = router;
