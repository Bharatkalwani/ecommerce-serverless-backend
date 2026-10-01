const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../db/sequelize");

class User extends Model {

    async validPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true
    }
);

User.beforeSave(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;