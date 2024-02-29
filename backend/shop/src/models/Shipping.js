class shipping {
    constructor(
        id,
        userId,
        userFullName,
        orderId,
        address,
        contactInfo,
        shippingCompany,
        trackingNumber,
        estimateDeliveryDate,
        shippingType, // standar, express, urgent
        shippingCost,
        createAt,
        updateAt,
        incidents
    ) {
        this.id = id;
        this.userId = userId;
        this.userFullName = userFullName;
        this.orderId = orderId;
        this.address = address;
        this.contactInfo = contactInfo;
        this.shippingCompany = shippingCompany;
        this.trackingNumber = trackingNumber;
        this.estimateDeliveryDate = estimateDeliveryDate;
        this.shippingType = shippingType;
        this.shippingCost = shippingCost;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.incidents = incidents;
    }

    
};

// User.comparePassword = async(password, receivedPassword) => {
//     return await bcrypt.compare(password, receivedPassword)
// }



module.exports = Item;