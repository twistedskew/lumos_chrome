(function (lumos) {
  var gamesRepository = [
    { slug: 'brain-shift-2',
      name: 'Brain Shift' },
    { slug: 'brain-shift-overdrive-2',
      name: 'Brain Shift Overdrive' },
    { slug: 'chalkboard-challenge-2',
      name: 'Chalkboard Challenge' },
    { slug: 'color-match-2',
      name: 'Color Match' },
    { slug: 'contextual',
      name: 'Contextual' },
    { slug: 'continuum',
      name: 'Continuum' },
    { slug: 'disillusion-2',
      name: 'Disillusion' },
    { slug: 'ebb-and-flow',
      name: 'Ebb and Flow' },
    { slug: 'editors-choice',
      name: 'Editors Choice' },
    { slug: 'follow-that-frog',
      name: 'Follow that Frog' },
    { slug: 'highway-hazards',
      name: 'Highway Hazards'},      
    { slug: 'lost-in-migration-2',
      name: 'Lost in Migration' },
    { slug: 'memory-match-2',
      name: 'Memory Match' },
    { slug: 'memory-match-overdrive',
      name: 'Memory Match Overdrive' },
    { slug: 'memory-matrix-2',
      name: 'Memory Matrix' },
    { slug: 'organic-order',
      name: 'Organic Order' },
    { slug: 'penguin-pursuit-2',
      name: 'Penguin Pursuit' },
    { slug: 'pet-detective',
      name: 'Pet Detective' },
    { slug: 'pinball-recall',
      name: 'Pinball Recall' },
    { slug: 'raindrops-2',
      name: 'Raindrops' },
    { slug: 'river-ranger',
      name: 'River Ranger' },
    { slug: 'robot-factory',
      name: 'Robot Factory' },
    { slug: 'spatial-speed-match-2',
      name: 'Spatial Speed Match' },
    { slug: 'speed-pack',
      name: 'Speed Pack' },
    { slug: 'speed-match-2',
      name: 'Speed Match' },
    { slug: 'speed-match-overdrive',
      name: 'Speed Match Overdrive' },
    { slug: 'splitting-seeds',
      name: 'Splitting Seeds' },
    { slug: 'star-search',
      name: 'Star Search' },
    { slug: 'taking-root',
      name: 'Taking Root' },
    { slug: 'train-of-thought',
      name: 'Train of Thought' },
    { slug: 'tidal-treasures',
      name: 'Tidal Treasures' },
    { slug: 'trouble-brewing',
      name: 'Trouble Brewing' }
    { slug: 'word-bubbles-2',
      name: 'Word Bubbles 2' }];

  lumos.Repository = {
    // .by_pair
    //
    // Iterate over gamesRepository yielding the name and slug properties.
    byPair: function (interatee) {
      _(gamesRepository).each(function (game) {
        interatee(game.slug, game.name);
      });
    },

    // .all
    //
    // Iterates over the collection and returns an array with the value
    // of calling the property passed to the iteratee object.
    all: function (property) {
      return _(gamesRepository).map(function (game) {
        return game[property];
      });
    }
  };

})(
 _.isUndefined(this.lumos) ? (this.lumos = {}) : lumos
);
