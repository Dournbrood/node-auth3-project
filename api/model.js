const database = require("../data/dbConfig");

module.exports = {
    add,
    find,
    findBy,
    findbyID
}

async function add(user) {
    const [id] = await database("users").insert(user);

    return findbyID(id);
}

function findBy(filter) {
    return database("users").where(filter);
}

function findbyID(id) {
    return database("users")
        .where({ id })
        .first();
}

function find() {
    return database("users")
        .select("*")
}