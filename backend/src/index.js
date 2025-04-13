import express from 'express';
import cors from 'cors'
import clientRoute from './routes/clientRoute.js'

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(express.json())

app.use('/api/clients', clientRoute)





try{
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}
