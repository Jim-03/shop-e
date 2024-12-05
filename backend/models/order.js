const {DataTypes} = require("sequelize");
const {database} = require("../database/database");

const order = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    buyer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "users",
            key: 'id'
        }
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_type: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    shipping_address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("shipping", 'received', 'cancelled', 'delivered', 'completed', 'pending'),
        defaultValue: 'pending',
        allowNull: false
    },
    shop_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'shops',
            key: 'id'
        }
    }
}

module.exports = database.define("Order", order, {tableName: 'orders', timestamps: true})