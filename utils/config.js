const HOST_URL = 'https://api.atsjtu.cc/subjectRanking';
const POSTER_URL = 'http://p1xf71d56.bkt.clouddn.com/images/poster_subjectRanking.png';

module.exports = {
    POSTER_URL: POSTER_URL,
    getUniversityRankingUrl: (subjectCode, first) => HOST_URL + '/universityRanking?subjectCode=' + subjectCode + '&first=' + first,
    getSubjectRankingUrl: universityNum => HOST_URL + '/subjectRanking?universityNum=' + universityNum
};
