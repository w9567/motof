//引入express
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//监听窗口启动服务
app.listen(8000, () => {
    console.log("服务已启动，8000端口监听中-----");
  })
  