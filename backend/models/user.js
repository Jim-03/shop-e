const {DataTypes} = require("sequelize")
const {database} = require("../database/database")

const user = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_photo_url: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    user_type: {
        type: DataTypes.ENUM("customer", "seller", "transporter", 'customer_care', "admin"),
        defaultValue: 'customer',
        allowNull: false
    },
    account_status: {
        type: DataTypes.ENUM("active", "suspended", "inactive"),
        defaultValue: 'inactive',
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    }
}

module.exports = database.define("User", user, {tableName: 'users', timestamps: true})