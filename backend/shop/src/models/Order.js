class Order {
    constructor(
        id,
        userId,
        createdAt,
        updatedAt,
        orderedAt,
        sendedAt,
        paidAt,
        total,
        // statusCart,
        statusOrder,
        paymentId,
        paymentStatus,
        carrier,
        address,
        postalCode,
        community,
        phoneContact,
    ) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.orderedAt = orderedAt;
        this.sendedAt = sendedAt;
        this.paidAt = paidAt;
        this.total = total;
        // this.statusCart = statusCart;
        this.statusOrder = statusOrder;
        this.paymentId = paymentId;
        this.paymentStatus = paymentStatus;
        this.carrier = carrier;
        this.address = address;
        this.postalCode = postalCode;
        this.community = community;
        this.phoneContact = phoneContact;
    }

    
};

// User.comparePassword = async(password, receivedPassword) => {
//     return await bcrypt.compare(password, receivedPassword)
// }



module.exports = Order;