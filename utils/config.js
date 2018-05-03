const HOST_URL = 'https://api.atsjtu.cc/subjectRanking';
const CDN_URL = 'http://p1xf71d56.bkt.clouddn.com';

module.exports = {
    REMARKS_URL: HOST_URL + '/getRemarks',
    POSTER_URL: CDN_URL + '/images/poster_subjectRanking.png',
    getWikiUrl: (link) => CDN_URL + '/images/' + link,
    getUniversityRankingUrl: (subjectCode, first) => HOST_URL + '/universityRanking?subjectCode=' + subjectCode + '&first=' + first,
    getSubjectRankingUrl: universityNum => HOST_URL + '/subjectRanking?universityNum=' + universityNum
};
