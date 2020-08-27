exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("teams", (tbl) => {
      tbl.increments("teamId");
      tbl.string("teamName").notNullable();
    })
    .createTable("eventTeams", (tbl) => {
      tbl.increments("eventTeamId");
      tbl
        .integer("userAllianceEventId")
        .unsigned()
        .references("userAllianceEventId")
        .inTable("userAllianceEvent")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("teamId", 255)
        .unsigned()
        .references("teamId")
        .inTable("teams")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("allianceEventTeams", (tbl) => {
      tbl.increments("allianceEventTeamsId");
      tbl
        .integer("allianceId", 255)
        .unsigned()
        .references("allianceId")
        .inTable("alliance")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("eventId", 255)
        .unsigned()
        .references("eventId")
        .inTable("event")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("teamId", 255)
        .unsigned()
        .references("teamId")
        .inTable("teams")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("eventTeams")
    .dropTableIfExists("teams")
    .dropTableIfExists("userAllianceEvent")
    .dropTableIfExists("userAlliance")
    .dropTableIfExists("event")
    .dropTableIfExists("alliance")
    .dropTableIfExists("userProfile")
    .dropTableIfExists("profile")
    .dropTableIfExists("users");
};
