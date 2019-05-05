const Model = use('Model');

class Wallet extends Model {
  outputs() {
    return this.hasMany('App/Models/Transaction', 'id', 'wallet_origin_id');
  }

  inputs() {
    return this.hasMany('App/Models/Transaction', 'id', 'wallet_destiny_id');
  }

  user() {
    return this.hasOne('App/Models/User');
  }
}

module.exports = Wallet;
