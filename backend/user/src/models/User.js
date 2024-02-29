const bcrypt = require('bcryptjs')

class User {
    constructor(
        id,
        name,
        lastname,
        email,
        password,
        phone,
        address,
        postalCode,
        community,
        role,
        avatar,
        createAt,
        lastLogin,
        emailValidate,

    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.postalCode = postalCode;
        this.community = community;
        this.role = role;
        this.avatar = avatar;
        this.createAt = createAt;
        this.lastLogin = lastLogin;
        this.emailValidate = emailValidate;
    }

    
};

User.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}



module.exports = User;