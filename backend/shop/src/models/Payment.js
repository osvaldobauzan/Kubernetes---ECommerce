
class Payment {
    constructor(
        id,
        userId,
        orderId,
        paymentType,
        paypalAccount,
        paymentStatus,
        total,
        createAt,
        updateAt
    ) {
        this.id = id;
        this.userId = userId;
        this.orderId = orderId;
        this.paymentType = paymentType;
        this.paypalAccount = paypalAccount;
        this.paymentStatus = paymentStatus;
        this.total = total;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
    
};

// User.comparePassword = async(password, receivedPassword) => {
//     return await bcrypt.compare(password, receivedPassword)
// }



module.exports = Payment;