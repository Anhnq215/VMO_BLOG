require("dotenv").config();

import express , {Application,Response,Request,NextFunction, urlencoded} from 'express'
import connect from './configs/database'
import router from './routes/api/index'


const app : express.Application = express()

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const run = async () => {
    await connect();
    app.use('/', router)
}

run();

app.listen(5000, () => {
    console.log('Server is running')
})