const Model = use('Model');
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }

      if (userInstance.dirty.token) {
        userInstance.token = await Hash.make(userInstance.token);
      }
    });
  }

  wallet() {
    return this.belongsTo('App/Models/Wallet');
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
