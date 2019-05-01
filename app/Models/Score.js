const Model = use('Model');

class Score extends Model {
  team() {
    return this.belongsTo('App/Models/Team');
  }

  season() {
    return this.belongsTo('App/Models/Season');
  }
}

module.exports = Score;
