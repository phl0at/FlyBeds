"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://t4.ftcdn.net/jpg/04/52/12/21/240_F_452122166_tzyiVVl60582IhGuj2EmHSYVoJrIXJW5.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://t4.ftcdn.net/jpg/04/52/12/21/240_F_452122166_tzyiVVl60582IhGuj2EmHSYVoJrIXJW5.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://t4.ftcdn.net/jpg/04/52/12/21/240_F_452122166_tzyiVVl60582IhGuj2EmHSYVoJrIXJW5.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://t3.ftcdn.net/jpg/01/18/46/52/240_F_118465200_0q7Of6UnbA8kDlYEe3a4PuIyue27fbuV.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://t4.ftcdn.net/jpg/02/45/74/65/240_F_245746541_w73mctgROl6puYGTZly2U87sPvn11mdn.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://t4.ftcdn.net/jpg/02/45/74/65/240_F_245746541_w73mctgROl6puYGTZly2U87sPvn11mdn.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://t4.ftcdn.net/jpg/02/45/74/65/240_F_245746541_w73mctgROl6puYGTZly2U87sPvn11mdn.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://t4.ftcdn.net/jpg/02/45/74/65/240_F_245746541_w73mctgROl6puYGTZly2U87sPvn11mdn.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://t3.ftcdn.net/jpg/04/27/70/64/240_F_427706432_OTNX01bqkZttcIX9sht4SxvjBm6xJHEX.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://t4.ftcdn.net/jpg/02/61/89/29/240_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://t4.ftcdn.net/jpg/02/61/89/29/240_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://t4.ftcdn.net/jpg/02/61/89/29/240_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://t4.ftcdn.net/jpg/02/61/89/29/240_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://t4.ftcdn.net/jpg/03/61/16/25/240_F_361162520_bgRKQmlB8lm2Z45NQ7GBaNT675tMOCGq.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://t4.ftcdn.net/jpg/02/32/58/45/240_F_232584505_TClqLckDs1d3EfY4f9m9R99JZ8CiEEjY.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://t4.ftcdn.net/jpg/02/32/58/45/240_F_232584505_TClqLckDs1d3EfY4f9m9R99JZ8CiEEjY.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://t4.ftcdn.net/jpg/02/32/58/45/240_F_232584505_TClqLckDs1d3EfY4f9m9R99JZ8CiEEjY.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://t4.ftcdn.net/jpg/02/32/58/45/240_F_232584505_TClqLckDs1d3EfY4f9m9R99JZ8CiEEjY.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://t3.ftcdn.net/jpg/04/32/56/22/240_F_432562253_0AJEmoX8idRHQiBDCCgHjdsHUBZG7ppx.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://t4.ftcdn.net/jpg/05/11/64/49/240_F_511644941_jJEbM3uRGtU9VicywWAmydnneqCTMm3q.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://t4.ftcdn.net/jpg/05/11/64/49/240_F_511644941_jJEbM3uRGtU9VicywWAmydnneqCTMm3q.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://t4.ftcdn.net/jpg/05/11/64/49/240_F_511644941_jJEbM3uRGtU9VicywWAmydnneqCTMm3q.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://t4.ftcdn.net/jpg/05/11/64/49/240_F_511644941_jJEbM3uRGtU9VicywWAmydnneqCTMm3q.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://t3.ftcdn.net/jpg/00/62/13/24/240_F_62132429_pw8W4rc1qLlCAP9SS9pPFDZyyPJZHwpw.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://t4.ftcdn.net/jpg/02/97/20/13/240_F_297201365_YhzWbrsv75h5mKkvILCDr0KaHRK1VqOt.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://t4.ftcdn.net/jpg/02/97/20/13/240_F_297201365_YhzWbrsv75h5mKkvILCDr0KaHRK1VqOt.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://t4.ftcdn.net/jpg/02/97/20/13/240_F_297201365_YhzWbrsv75h5mKkvILCDr0KaHRK1VqOt.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://t4.ftcdn.net/jpg/02/97/20/13/240_F_297201365_YhzWbrsv75h5mKkvILCDr0KaHRK1VqOt.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://t4.ftcdn.net/jpg/04/37/54/23/240_F_437542364_rUKRUDlOQ2ZmVrsijNFUfrhxZO7jyOFg.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://t4.ftcdn.net/jpg/01/58/83/57/240_F_158835740_70EdEjNVoQkDGoz13mTktOg2NVivd3Ja.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://t4.ftcdn.net/jpg/01/58/83/57/240_F_158835740_70EdEjNVoQkDGoz13mTktOg2NVivd3Ja.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://t4.ftcdn.net/jpg/01/58/83/57/240_F_158835740_70EdEjNVoQkDGoz13mTktOg2NVivd3Ja.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://t4.ftcdn.net/jpg/01/58/83/57/240_F_158835740_70EdEjNVoQkDGoz13mTktOg2NVivd3Ja.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://t3.ftcdn.net/jpg/05/09/62/16/240_F_509621631_5o3hQKN5vzNVFMdOj68uyBCNUFNlxAX8.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://t3.ftcdn.net/jpg/05/15/51/58/240_F_515515800_Dt10H8JBYktfdxCo52pfQzGo27XzMPr6.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://t3.ftcdn.net/jpg/05/15/51/58/240_F_515515800_Dt10H8JBYktfdxCo52pfQzGo27XzMPr6.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://t3.ftcdn.net/jpg/05/15/51/58/240_F_515515800_Dt10H8JBYktfdxCo52pfQzGo27XzMPr6.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://t3.ftcdn.net/jpg/05/15/51/58/240_F_515515800_Dt10H8JBYktfdxCo52pfQzGo27XzMPr6.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://t4.ftcdn.net/jpg/02/31/77/23/240_F_231772318_uX8dIX7qM03DufXhskCGSzD5qUxT6eFr.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://t4.ftcdn.net/jpg/04/45/36/53/240_F_445365328_iYlAgTM59RC6iufkvQemTEtbwsqJZEEN.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://t4.ftcdn.net/jpg/04/45/36/53/240_F_445365328_iYlAgTM59RC6iufkvQemTEtbwsqJZEEN.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://t4.ftcdn.net/jpg/04/45/36/53/240_F_445365328_iYlAgTM59RC6iufkvQemTEtbwsqJZEEN.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://t4.ftcdn.net/jpg/04/45/36/53/240_F_445365328_iYlAgTM59RC6iufkvQemTEtbwsqJZEEN.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://t3.ftcdn.net/jpg/02/05/30/94/240_F_205309444_CHwsFjT0w09gqyzi1zP8ahPHyLiT0K62.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://t4.ftcdn.net/jpg/05/91/31/13/240_F_591311375_rIu1oORnoofda2WkgU3OOpAlR4b1esdk.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://t4.ftcdn.net/jpg/05/91/31/13/240_F_591311375_rIu1oORnoofda2WkgU3OOpAlR4b1esdk.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://t4.ftcdn.net/jpg/05/91/31/13/240_F_591311375_rIu1oORnoofda2WkgU3OOpAlR4b1esdk.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://t4.ftcdn.net/jpg/05/91/31/13/240_F_591311375_rIu1oORnoofda2WkgU3OOpAlR4b1esdk.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://t4.ftcdn.net/jpg/01/18/15/73/240_F_118157330_XLIftnU5HZOmknLpnqCw9P3LjEm5dTT1.jpg",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
