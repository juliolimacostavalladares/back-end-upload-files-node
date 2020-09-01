'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Uploads', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
       },
       name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
       createdAt: {
         type: Sequelize.DATE,
         allowNull: false
       },
       updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Uploads');
  }
};
