import * as clientService from '../services/clientServices.js';

export const getClients = async(req,res, next) => {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (err) {
        console.error('Error fetching clients:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const createClients = async(req,res, next) => {
    try {
        const clientData = req.body;
    
        const newClient = await clientService.createClient(clientData);
        res.status(200).json(newClient);
    } catch (err) {
        console.error('Error fetching clients:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateClients = async(req,res, next) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updatedClient = await clientService.updateClient(clientData, clientId);
        res.status(200).json(updatedClient);
    } catch (err) {
        console.error('Error fetching clients:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteClients = async(req,res, next) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updatedClient = await clientService.deleteClient( clientId);
        res.status(200).json(updatedClient);
    } catch (err) {
        console.error('Error fetching clients:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const searchClients = async(req,res, next) => {
    try {
        const searchTerm = req.query.q;
        const updatedClient = await clientService.searchClient(searchTerm);
        res.status(200).json(updatedClient);
    } catch (err) {
        console.error('Error searching', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}