module.exports = {
    UserRequestDTO: class UserRequestDTO{
        constructor(user){
            this.name = user.name;
            this.email = user.email;
            this.password = user.password;
            this.role = user.role;
        }
    },
    UserResponseDTO: class UserResponseDTO{
        constructor(user){
            this.id = user._id;
            this.name = user.name;
            this.email = user.email;
            this.role = user.role;
        }
    }
}