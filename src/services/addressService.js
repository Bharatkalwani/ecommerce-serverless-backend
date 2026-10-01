const { Address } = require("../models/associations");

const getAddresses = async (userId) => {
    return await Address.findAll({
        where: {
            userId
        },
        order: [
            ["isDefault", "DESC"],
            ["createdAt", "DESC"]
        ]
    });
};

const getAddressById = async (userId, addressId) => {
    const address = await Address.findOne({
        where: {
            id: addressId,
            userId
        }
    });

    if (!address) {
        const error = new Error("Address not found");
        error.statusCode = 404;
        throw error;
    }

    return address;
};

const createAddress = async (userId, data) => {
    const {
        name,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country = "India",
        isDefault = false
    } = data;

    if (
        !name ||
        !phone ||
        !addressLine1 ||
        !city ||
        !state ||
        !postalCode
    ) {
        const error = new Error(
            "name, phone, addressLine1, city, state and postalCode are required"
        );
        error.statusCode = 400;
        throw error;
    }

    // If this is the first address, make it default.
    const existingCount = await Address.count({
        where: { userId }
    });

    const shouldBeDefault =
        existingCount === 0 || isDefault === true;

    if (shouldBeDefault) {
        await Address.update(
            { isDefault: false },
            {
                where: { userId }
            }
        );
    }

    return await Address.create({
        userId,
        name,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        isDefault: shouldBeDefault
    });
};

const updateAddress = async (
    userId,
    addressId,
    data
) => {
    const address = await getAddressById(
        userId,
        addressId
    );

    const {
        name,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        isDefault
    } = data;

    if (isDefault === true) {
        await Address.update(
            { isDefault: false },
            {
                where: { userId }
            }
        );
    }

    await address.update({
        name,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        isDefault
    });

    return address;
};

const deleteAddress = async (
    userId,
    addressId
) => {
    const address = await getAddressById(
        userId,
        addressId
    );

    await address.destroy();

    return {
        message: "Address deleted successfully"
    };
};

module.exports = {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
};