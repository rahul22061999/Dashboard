import express from 'express';
import * as clientcontroller from '../controllers/clientConroller.js' // must be exact

const router = express.Router();

router.get('/clients', clientcontroller.getClients);

router.post('/clients', clientcontroller.createClients);

router.put('/clients/:id', clientcontroller.updateClients);

router.delete('/clients/:id', clientcontroller.deleteClients);


router.get('/clients/search', clientcontroller.searchClients);

export default router;
