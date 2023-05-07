import express from "express";
import {
  get_nlu_structure,
  get_nlu_structure_name,
  add_nlu_structure,
  put_nlu_structure,
  delete_nlu_structure,
  logout,
  get_nlu_assembly
} from '../controllers/NLU_controller.js'
//import passport from 'passport'

const router = express.Router();

/*const checkAuthenticated = (req, res, next) => {

  if (res.locals.authenticated) {
    return next()
  }
  
  res.status(401).end();
}*/

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

/*router.get('/logout', logout);
router.get('/nlu_structures', checkAuthenticated, get_nlu_structure);
router.get('/nlu_structure_name', checkAuthenticated, get_nlu_structure_name);
router.post('/nlu_structure', checkAuthenticated, add_nlu_structure);
router.put('/nlu_structure/:id', passport.authenticate('jwt', {session: false}), put_nlu_structure);
router.delete('/nlu_structure/:id',  passport.authenticate('jwt', {session: false}), delete_nlu_structure);
router.get('/nlu_assembly', checkAuthenticated, get_nlu_assembly);*/
//Auth Free
router.get('/logout', logout);
router.get('/nlu_structures', get_nlu_structure);
router.get('/nlu_structure_name', get_nlu_structure_name);
router.post('/nlu_structure', add_nlu_structure);
router.put('/nlu_structure/:id', put_nlu_structure);
router.delete('/nlu_structure/:id', delete_nlu_structure);
router.get('/nlu_assembly', get_nlu_assembly);

export default router