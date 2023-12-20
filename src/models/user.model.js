module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    })

    User.associate = (models) => {
        User.belongsToMany(models.Role, {
          through: 'user_roles',
          as: 'role',
          foreignKey: 'userId',
        });
      };

    return User;
}