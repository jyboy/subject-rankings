import locales from '../data/locales.json';

const labels = ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'];
const classes = ['', 'gold', 'silver', 'bronze'];

/**
 * Converts a ranking to the grade with localized description.
 *
 * @param {number} ranking - The value (1~9) of subject ranking.
 * @param {string} [lang='en'] - The language code: 'en' or 'zh'.
 * @return {object} The grade and description object based on the ranking.
 * @exports
 */
export const rankingToGrade = (ranking, lang = 'en') => {
  if (ranking >= 1 && ranking <= 9 && ['en', 'zh'].includes(lang)) {
    return {
      label: labels[ranking],
      description: locales.grades[labels[ranking]][lang]
    };
  }
  return { label: '', description: '' };
};

// TODO: JSDoc
export const rankingToClass = (ranking) => {
  if (ranking >= 1 && ranking <= 3) {
    return classes[ranking];
  }
  return 'default';
};
