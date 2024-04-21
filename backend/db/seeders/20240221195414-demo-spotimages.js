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
          url: "https://as2.ftcdn.net/v2/jpg/02/66/06/51/1000_F_266065133_wfkQdGm5xvbwc18JDoTjzCUgYzsmgW6T.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://as2.ftcdn.net/v2/jpg/03/16/30/41/1000_F_316304128_yZJhzPvCxbUjn7q5z2EI36HBTaRkbXNP.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://as2.ftcdn.net/v2/jpg/02/32/58/45/1000_F_232584505_TClqLckDs1d3EfY4f9m9R99JZ8CiEEjY.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://as1.ftcdn.net/v2/jpg/04/63/73/98/1000_F_463739839_3vETFyxh9UhLgIJmaw2FbKGb06RPi2zt.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://as1.ftcdn.net/v2/jpg/04/27/70/64/1000_F_427706432_OTNX01bqkZttcIX9sht4SxvjBm6xJHEX.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://as2.ftcdn.net/v2/jpg/01/07/75/39/1000_F_107753993_TMy2YQVb2Ye3UHhqz3DZ0xibAHR4VIsp.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://as1.ftcdn.net/v2/jpg/02/32/63/96/1000_F_232639605_kGcrGlpu9SMmpqvsUMgPMAtX81DZHRQr.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://as1.ftcdn.net/v2/jpg/02/66/40/50/1000_F_266405083_Nb2U11cwV4wj3fnBWFg10raLyqwaR8hf.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://as2.ftcdn.net/v2/jpg/02/78/30/15/1000_F_278301551_fJZjdYNNdkjM2aCZXKq3PQrjPqNoJMxo.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://as1.ftcdn.net/v2/jpg/01/18/46/52/1000_F_118465200_0q7Of6UnbA8kDlYEe3a4PuIyue27fbuV.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://as1.ftcdn.net/v2/jpg/01/09/55/84/1000_F_109558424_5bnTozZZokiDlgLKmymZt8qAS8FYnnBi.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://as2.ftcdn.net/v2/jpg/01/09/55/87/1000_F_109558716_UYfJmdZTdDjWIOtkICA1sPk8XqI7Njci.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://as2.ftcdn.net/v2/jpg/01/09/55/85/1000_F_109558537_VKziSe5rJryzCxttALlvRJHcsD4TRomm.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://as1.ftcdn.net/v2/jpg/02/05/34/40/1000_F_205344052_lQnLLNiD13jzOncxzUrwWCBsiLoVj0bK.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://as2.ftcdn.net/v2/jpg/03/61/16/25/1000_F_361162520_bgRKQmlB8lm2Z45NQ7GBaNT675tMOCGq.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://as1.ftcdn.net/v2/jpg/02/27/07/46/1000_F_227074670_1d2VL5hoLwrwcZEXv7RdUYDQQdvqvnjn.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://as1.ftcdn.net/v2/jpg/02/27/07/46/1000_F_227074608_utWm84jeArtzww8obHgtONzKn3W8nhzY.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://as2.ftcdn.net/v2/jpg/01/36/32/15/1000_F_136321570_vdzGyD9wnc618kDmYcLsdsyZJqWUtnZf.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://as2.ftcdn.net/v2/jpg/02/05/70/33/1000_F_205703370_cdgaQw8I6ZxvIJ1I6LK3Vr3XbjzH3zWW.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://as1.ftcdn.net/v2/jpg/04/32/56/22/1000_F_432562253_0AJEmoX8idRHQiBDCCgHjdsHUBZG7ppx.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://as1.ftcdn.net/v2/jpg/02/13/75/04/1000_F_213750445_7RL7Yls7kS7zmiXanHYAtsVMXN1EnF9l.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://as1.ftcdn.net/v2/jpg/02/39/84/32/1000_F_239843260_TNOFYyRYo9jpW8eArHNzdkBGjzhnc7Ww.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://as2.ftcdn.net/v2/jpg/02/39/84/07/1000_F_239840748_zrV1T1E9F0dRllaPzpmNxSLadA4O1VVr.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://as1.ftcdn.net/v2/jpg/02/95/63/92/1000_F_295639253_7MgfBDPJf3YLwoquN2jWlqQlMdZTEPuC.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://as1.ftcdn.net/v2/jpg/00/62/13/24/1000_F_62132429_pw8W4rc1qLlCAP9SS9pPFDZyyPJZHwpw.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://as2.ftcdn.net/v2/jpg/05/91/31/13/1000_F_591311339_WRx6jBcvLnXQAQ7ZpIch35mYHHDpJbIU.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://as2.ftcdn.net/v2/jpg/05/91/31/13/1000_F_591311375_rIu1oORnoofda2WkgU3OOpAlR4b1esdk.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://as2.ftcdn.net/v2/jpg/02/97/20/13/1000_F_297201365_YhzWbrsv75h5mKkvILCDr0KaHRK1VqOt.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://as2.ftcdn.net/v2/jpg/04/18/33/19/1000_F_418331990_19XPoUYZzDhLVoWbItLAfkHb0GhkZoEQ.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://as2.ftcdn.net/v2/jpg/04/37/54/23/1000_F_437542364_rUKRUDlOQ2ZmVrsijNFUfrhxZO7jyOFg.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://as1.ftcdn.net/v2/jpg/02/72/16/84/1000_F_272168411_53RUfKd7UDUiljdy2M1Xos38a9lEQp2L.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://as1.ftcdn.net/v2/jpg/02/72/16/84/1000_F_272168413_bEc7KRt1pufAG8BLFmMcmG3Dko1fnhNE.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://as2.ftcdn.net/v2/jpg/06/19/81/23/1000_F_619812338_MFDtpJ9IpCodkNhydCiYjyzBQFXthNUU.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://as2.ftcdn.net/v2/jpg/04/45/36/53/1000_F_445365328_iYlAgTM59RC6iufkvQemTEtbwsqJZEEN.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://as1.ftcdn.net/v2/jpg/05/09/62/16/1000_F_509621631_5o3hQKN5vzNVFMdOj68uyBCNUFNlxAX8.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://as2.ftcdn.net/v2/jpg/05/32/81/35/1000_F_532813517_R8GJlsq40iUQLpZi2K9nJwMwLzhPFUAp.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://as2.ftcdn.net/v2/jpg/01/88/34/87/1000_F_188348744_nGcgyUSmlalb0MhY87axTa4HXXnckmKO.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://as1.ftcdn.net/v2/jpg/01/88/34/84/1000_F_188348442_fkS9gadYXwN33NdgDHOP9WBbXtqq1ePX.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://as2.ftcdn.net/v2/jpg/03/57/29/49/1000_F_357294987_8tSzI2Vt1Nu27LKe6R5f70MbfW7VAcC9.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://as1.ftcdn.net/v2/jpg/03/57/29/66/1000_F_357296644_jZcnxFUpcWDcoPwcnaEJBpscagim8knh.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://as2.ftcdn.net/v2/jpg/01/06/45/03/1000_F_106450391_onKLCuJbKB0Crit24riOIPtkv5iM76km.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://as2.ftcdn.net/v2/jpg/01/33/61/27/1000_F_133612751_0LN7ow82feyf6NLQRPsr8r2BfzoYGhg6.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://as1.ftcdn.net/v2/jpg/05/32/38/26/1000_F_532382645_hk7yvbG5BZNlwsR8XLT3xmRyY10s3hlK.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://as1.ftcdn.net/v2/jpg/05/32/81/34/1000_F_532813481_4YR3d9siZ8NJXUY1Yg8ABimKWjEViF0e.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://as2.ftcdn.net/v2/jpg/03/45/40/85/1000_F_345408567_EIWakXLUjiSbP7BtQLNyqdR7R4DfsyAx.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://as1.ftcdn.net/v2/jpg/07/45/14/38/1000_F_745143838_AfaDQKZIO5K3n5fxvlcRTTgRFm5cXQIM.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://as2.ftcdn.net/v2/jpg/07/07/93/59/1000_F_707935985_6QQvtRYshYDYCCgggUvdnDeMTqFP7CHa.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://as1.ftcdn.net/v2/jpg/06/65/91/38/1000_F_665913886_M8yLNkugVhHjbne9ZCSHdHn7RQ74inNt.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://as2.ftcdn.net/v2/jpg/06/65/90/65/1000_F_665906504_2uGCMfST8T9UqemVCheWntW44bcluB8n.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://as1.ftcdn.net/v2/jpg/00/04/97/06/1000_F_4970668_G73XyO5DxFLgPxTuUk1HXYeCIuGvNiNU.jpg",
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
