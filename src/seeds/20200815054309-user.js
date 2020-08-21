const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = [
      {
        name: "Katie Stein",
        username: "leadon",
        email: "katie.stein@quintity.name",
        password: await bcrypt.hash("dev", 10),
        createdAt: "2012-6-17 12:28:49",
        updatedAt: "1980-8-30 16:41:51",
      },
      {
        name: "Elisabeth Page",
        username: "veljef",
        email: "elisabeth.page@centregy.io",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1988-2-15 16:16:02",
        updatedAt: "1983-5-3 07:44:21",
      },
      {
        name: "Melba Mcdonald",
        username: "maydav",
        email: "melba.mcdonald@frosnex.ca",
        password: await bcrypt.hash("dev", 10),
        createdAt: "2011-5-19 05:15:13",
        updatedAt: "1970-3-2 09:01:08",
      },
      {
        name: "Clayton Kane",
        username: "esmcol",
        email: "clayton.kane@volax.info",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1980-10-14 00:22:51",
        updatedAt: "2002-6-9 11:24:59",
      },
      {
        name: "Franklin Spears",
        username: "kenhay",
        email: "franklin.spears@uniworld.co.uk",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1995-10-12 14:42:32",
        updatedAt: "1976-4-30 20:34:21",
      },
      {
        name: "Casandra Frost",
        username: "mciriv",
        email: "casandra.frost@kaggle.com",
        password: await bcrypt.hash("dev", 10),
        createdAt: "2002-2-11 11:41:54",
        updatedAt: "2008-3-18 10:23:39",
      },
      {
        name: "Arline Flynn",
        username: "sansno",
        email: "arline.flynn@envire.net",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1974-6-19 21:45:18",
        updatedAt: "1981-4-8 19:10:37",
      },
      {
        name: "Bowen Thompson",
        username: "macbal",
        email: "bowen.thompson@vicon.tv",
        password: await bcrypt.hash("dev", 10),
        createdAt: "2007-9-13 16:51:16",
        updatedAt: "2012-7-27 23:43:10",
      },
      {
        name: "Josefa Mcmahon",
        username: "hareng",
        email: "josefa.mcmahon@multron.biz",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1990-9-29 16:34:42",
        updatedAt: "2009-7-21 02:48:06",
      },
      {
        name: "Alberta Daugherty",
        username: "parest",
        email: "alberta.daugherty@corporana.biz",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1985-1-9 02:14:42",
        updatedAt: "1985-7-21 00:01:43",
      },
      {
        name: "Osborne Dejesus",
        username: "vegmel",
        email: "osborne.dejesus@conferia.org",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1983-12-19 06:11:14",
        updatedAt: "1972-10-11 09:21:56",
      },
      {
        name: "Lily Mcguire",
        username: "newalv",
        email: "lily.mcguire@kenegy.us",
        password: await bcrypt.hash("dev", 10),
        createdAt: "2020-1-31 16:23:20",
        updatedAt: "1987-7-20 18:55:35",
      },
      {
        name: "Bethany Pope",
        username: "yolros",
        email: "bethany.pope@ecolight.name",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1978-12-24 18:36:01",
        updatedAt: "1992-2-27 20:08:46",
      },
      {
        name: "Terrell Haley",
        username: "elnyan",
        email: "terrell.haley@pivitol.io",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1991-4-11 05:31:37",
        updatedAt: "2017-6-2 23:37:40",
      },
      {
        name: "Georgia Morton",
        username: "ingave",
        email: "georgia.morton@hivedom.ca",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1999-3-6 15:45:57",
        updatedAt: "1988-10-8 11:01:30",
      },
      {
        name: "Dodson Colon",
        username: "ranhea",
        email: "dodson.colon@hopeli.info",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1980-12-25 18:25:17",
        updatedAt: "1979-11-14 23:55:48",
      },
      {
        name: "Graves Curtis",
        username: "joyhol",
        email: "graves.curtis@imageflow.co.uk",
        password: await bcrypt.hash("dev", 10),
        createdAt: "2004-8-14 18:27:30",
        updatedAt: "2013-7-1 09:07:25",
      },
      {
        name: "Beatriz Buchanan",
        username: "brimat",
        email: "beatriz.buchanan@ontagene.com",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1985-3-24 08:07:31",
        updatedAt: "1991-2-18 14:48:09",
      },
      {
        name: "Ashlee Maldonado",
        username: "matjoh",
        email: "ashlee.maldonado@marvane.net",
        password: await bcrypt.hash("dev", 10),
        createdAt: "2005-10-28 18:00:43",
        updatedAt: "1991-7-18 11:26:41",
      },
      {
        name: "Etta Landry",
        username: "fredel",
        email: "etta.landry@genmom.tv",
        password: await bcrypt.hash("dev", 10),
        createdAt: "1995-7-17 23:41:25",
        updatedAt: "1977-2-11 03:15:10",
      },
    ];
    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
