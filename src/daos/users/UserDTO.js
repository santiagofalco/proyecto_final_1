export default class UserDTO {
    constructor(result) {
        this.id = result._id
        this.email = result.email
        this.password = result.password
        this.name = result.name
        this.avatar = result.avatar
        this.currentCartId = result.currentCartId
        this.role = result.role
    }
}