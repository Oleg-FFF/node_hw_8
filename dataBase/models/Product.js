const {PRODUCT} = require('../../constants/modelNames.enum')

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(PRODUCT, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sale_price: {
                type: DataTypes.INTEGER,
            },
            coupon_code: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'products',
            timestamps: false
        })


    return Product;
};
