const controllerUser = require("../controllers/users");
const resolvers = {
  Query: {
    getAllUsers: () => controllerUser.getAllUsers(),
    getByIdUser(parent, args) {
      return controllerUser.getByIdUser(args.id);
    },
  },
  Mutation: {
    createNewUser(parent, args) {
      controllerUser.createNewUser(args);
      return args;
    },
    updateUser(parent, args) {
      controllerUser.updateUser(args);
      return args;
    },
    deleteUser(parent, args) {
      controllerUser.deleteUser(args);
      return args;
    },
  },
};

module.exports = { resolvers };
