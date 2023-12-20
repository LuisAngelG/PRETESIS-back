module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
          through: 'user_roles',
          as: 'user',
          foreignKey: 'roleId',
        });
      };

    return Role;
}