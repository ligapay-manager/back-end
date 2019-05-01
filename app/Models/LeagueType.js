const Model = use('Model');

class LeagueType extends Model {
  leagues() {
    return this.hasMany('App/Models/Leagues');
  }
}

module.exports = LeagueType;
