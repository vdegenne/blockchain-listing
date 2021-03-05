import Koa from 'koa'
import Router from 'koa-router'
import statics from 'koa-static'

const port = 44059;
const app = new Koa;


app.use(statics('public'))



app.listen(port, () => console.log(`listening on http://localhost:${port}/`))