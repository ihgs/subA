const { Client } = require('pg')
const client = new Client({
    user: process.env["DB_USER"],
    host: process.env["DB_HOST"],
    database: process.env["DB_DATABASE"],
    password: process.env["DB_PASS"],
    port: 5432
})


console.log(
{
    user: process.env["DB_USER"],
    host: process.env["DB_HOST"],
    database: process.env["DB_DATABASE"],
    password: process.env["DB_PASS"],
    port: 5432
})

async function books(){
    client.connect()
    const query = {
        text: "SELECT * FROM books",
        rowMode: 'array'
    }
    const res = await client.query(query)
    const data = []
    res.rows.forEach(row =>{
        data.push(row)
    })
    client.end()
    return data
}

module.exports = {
    books
}