exports.up = function (knex) {
    return knex.schema.createTable("users", table => {
        table.increments();

        table.string("username", 128)
            .notNullable()
            .index()
            .unique()

        table.string("password")
            .notNullable()

        table.string("department")
            .notNullable()
            .index()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};