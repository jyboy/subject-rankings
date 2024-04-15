const HOST_URL = 'https://subject-rankings.jyboy.workers.dev';
const OSS_URL = 'https://storage-oss.ipin.com/school-icon';
const CDN_URL = 'https://cdn.atsjtu.cc/subject-ranking';

/**
 * Builds the URL for retrieving universities or subjects.
 *
 * @param {string} code The code of subject or university to filter by.
 * @param {string} type The type of request: 'subject' or 'university'.
 * @returns {string} The URL for retrieving universities or subjects.
 * @export
 */
export const buildRequestUrl = (code, type) => {
  if (type === 'university') {
    return `${HOST_URL}/universities?subject_code=${code}`;
  } else if (type === 'subject') {
    return `${HOST_URL}/subjects?university_code=${code}`;
  }
  return HOST_URL;
};

/**
 * Builds the URL for retrieving a university logo image.
 *
 * @param {string} logo The logo identifier.
 * @returns {string} The URL for the logo image.
 * @export
 */
export const buildLogoUrl = (logo) => {
  if (logo.startsWith('_')) {
    return `${CDN_URL}/${logo}.jpg`;
  }
  return `${OSS_URL}/${logo}.jpg`;
};

/**
 * Checks if a code of subject or university is valid.
 *
 * @param {string} code The code of subject or university to validate.
 * @param {string} type The type of code: 'subject' or 'university'.
 * @returns {boolean} True if the code is valid, false otherwise.
 * @export
 */
export const isCodeValid = (code, type) => {
  if (type === 'subject') {
    return /^\d{4}$/.test(code);
  } else if (type === 'university') {
    return /^\d{5}$/.test(code);
  }
  return false;
};
