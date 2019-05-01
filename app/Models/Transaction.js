const Model = use('Model');

class Transaction extends Model {
  origin() {
    return this.belongsTo('App/Models/Wallet', 'id', 'wallet_origin_id');
  }

  destiny() {
    return this.belongsTo('App/Models/Wallet', 'id', 'wallet_destiny_id');
  }
}

module.exports = Transaction;
