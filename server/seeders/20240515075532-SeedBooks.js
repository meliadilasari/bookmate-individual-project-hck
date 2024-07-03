"use strict";
const axios = require("axios");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const response = await axios.get(
      `https://all-books-api.p.rapidapi.com/getBooks`,
      {
        headers: {
          "X-RapidAPI-Key":
            "826437fcc4mshc3de18227b1e2f0p178ab3jsn4217a5a250d8",
          "X-RapidAPI-Host": "all-books-api.p.rapidapi.com",
        },
      }
    );

    const data = response.data.map((book) => {
      let { bookTitle, bookImage, bookDescription, bookAuthor, bookPublisher } =
        book;

      return {
        title: bookTitle,
        authors: bookAuthor,
        publisher: bookPublisher,
        description: bookDescription,
        imgUrl: bookImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Books", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Books", null, {});
  },
};
