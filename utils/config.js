const HOST_URL = 'https://api.atsjtu.cc/subjectRanking';
const CDN_URL = 'https://cdn.atsjtu.cc/subject-ranking';

module.exports = {
    REMARKS_URL: `${HOST_URL}/getRemarks`,
    POSTER_URL: `${CDN_URL}/poster_subjectRanking.png`,
    getWikiUrl: (link) => `${CDN_URL}/${link}`,
    getUniversityRankingUrl: (subjectCode, first) => `${HOST_URL}/universityRanking?subjectCode=${subjectCode}&first=${first}`,
    getSubjectRankingUrl: universityNum => `${HOST_URL}/subjectRanking?universityNum=${universityNum}`
};
