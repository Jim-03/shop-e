const {DataTypes} = require('sequelize')
const {database} = require('../database/database')

const delivery_tracking = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    current_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('processing', 'in_transit', 'out_for_delivery', 'delivered'),
        defaultValue: 'processing',
        allowNull: false
    },
    date_delivered: {
        type: DataTypes.DATE,
        allowNull: true
    }
}
module.exports = database.define('DeliveryTracking', delivery_tracking, {tableName: 'delivery_tracking', timestamps: true})