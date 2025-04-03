const { books } = require("../db")

test("db",async ()=>{
    const mybooks = await books()
    expect(mybooks.length).toBe(3)
})