import express from 'express'
import {MongoClient} from 'mongodb'
const app = express();
app.use(express.json());

const  getConnection = async () => {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
     
    await client.connect();
    const db = client.db('react-db-blog');
    return db;
}
app.get('/api/articles',async (req, res) => { 
    const db = await getConnection(); 
      
    const articles = await db.collection('articles').find({}).toArray();
    res.json(articles);
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const db = await getConnection();
     ;
    const article = await db.collection('articles').findOne({ name });
   
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const db = await getConnection();
    await db.collection('articles')
            .updateOne({ name }, {
                $inc:{upvotes:1},
            });
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.send(article);

    } else {
        res.send(`The $(name) article doesn't exists`);
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    console.log(postedBy + text);
    if (!name || !postedBy || !text) {
        res.send('Invalid arguments');
        return
    }
        console.log('post comments :'+ text);
    const db = await getConnection();
    
    await db.collection('articles')
            .updateOne({ name }, {
                $push: { comments: { postedBy, text } },
            });
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);

    } else {
        res.send(`The $(name) article doesn't exists`);
    }
});

app.get('/hello', (req, res) => {
    res.send('Hello !');
    
});

app.listen(8000, () => {
    console.log('server is listening on port 8000')
});
