
class Elo {
	constructor() {
		// TODO: these go into an options argument
		this.floor = 100;
		this.k = 40;
	}
    
	/**
	 * Calculates the rating adjustment from the player's
	 * current rating, the opponent's rating, score, and the constant K.
	 *
	 * Score can be any number ranging from 0 to 1, but in most cases it's
	 * either 0 _or_ 1 (did the player win or lose?). Use 0.5 as the score to
	 * signify a draw.
	 *
	 * K is the maximum rating coefficient for any given match. For example, if
	 * K = 40 (the base K of chess rankings) and the rating difference
	 * between two players is great (the expected score for either player is ~1 or 0),
	 * then the most their rating their change will be 40.
	 *
	 * If a floor rating is defined, then the rating adjustment will never drop a player's
	 * rating below that value.
	 *
	 * @param {Number} rating the rating of the player
	 * @param {Number} rc the rating of the opponent
	 * @param {Number} score the score of the player (from 0 to 1)
	 * @param {Number} k the rating coefficient
	 * @param {Number} floor the rating floor
	 */
	adjust(a, b, score, k = 40) {
		var expected = this.expectedScore(a, b);
		return Math.max(this.floor, Math.round(a + k * (score - expected)));
	}

	/**
	 * Calculates the expected score of a player (Player A) based on the
	 * rating difference between that player and an opponent (Player B).
	 * The expected score is a number between 0 - 1. An expected score of
	 * 0.5 implies that Player A and Player B have the same rating.
	 *
	 * If the rating of Player B is null, then Player A's rating will be
	 * used as the difference.
	 *
	 * @example
	 * int a = 1000;
	 * int b = 1000;
	 * elo.expectedScore(a, b);
	 * // => 0.5
	 *
	 * @param {Number} a the rating of player A
	 * @param {Number} b the rating of player B
	 * @return the expected score of the player
	 */
	expectedScore(a, b) {
		var diff;
		if(typeof b === "undefined") {
			diff = a;
		} else {
			diff = b - a;
		}
		return 1 / (1 + Math.pow(10, diff / 400));
	}
}

module.exports = Elo;
