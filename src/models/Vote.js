export default class Vote {
  constructor(countries, script) {
    this.resolution = script.title;
    this.ayes = [];
    this.nays = [];
    this.abstainers = [];
    this.getVotes(countries, script);
  }

  getVotes(countries, script) {
    countries.forEach((country) => {
      const countryAttitude = country.actualScriptsAtt.find(
        (attitude) => attitude.name === script.title
      );
      if (countryAttitude.value > 0) {
        this.ayes.push(country.title);
      } else if (countryAttitude.value < 0) {
        this.nays.push(country.title);
      } else {
        this.abstainers.push(country.title);
      }
    });
  }

  countVotes(votes) {
    return votes.length;
  }
}
