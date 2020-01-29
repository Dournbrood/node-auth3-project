// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/users.sqlite3'
    },
    pool: {
      afterCreate: (connect, done) => {
        connect.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
};
