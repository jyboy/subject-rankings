const config = require('../../utils/config');
const konst = require('../../utils/konst');

Page({
    data: {
        klasses: konst.klasses,
        klassIdx: 0,
        subjects: konst.klasses[0].children,
        subjectIdx: 0,
        universities: []
    },
    onLoad: function (opts) {
        if (opts.klassIdx) {
            this.setData({
                klassIdx: +opts.klassIdx,
                subjects: this.data.klasses[+opts.klassIdx].children,
                subjectIdx: +opts.subjectIdx
            });
        }
        this.setNavigationBarTitle(this.data.subjects[this.data.subjectIdx].subject);
        this.requestUniversities();
    },
    requestUniversities: function () {
        wx.showNavigationBarLoading();
        wx.request({
            url: config.getUniversityRankingUrl(this.data.subjects[this.data.subjectIdx].subjectCode, 1),
            success: (res) => {
                wx.hideNavigationBarLoading();
                this.setData({
                    universities: res.data.data
                });
                if (this.data.universities.length === 10) {
                    wx.request({
                        url: config.getUniversityRankingUrl(this.data.subjects[this.data.subjectIdx].subjectCode, 0),
                        success: (res) => {
                            this.setData({
                                universities: this.data.universities.concat(res.data.data)
                            });
                        }
                    });
                }
            }
        });
    },
    setNavigationBarTitle: (subject) => {
        wx.setNavigationBarTitle({
            title: `高校${subject}排名`
        });
    },
    bindKlassPickerChange: function (e) {
        this.setData({
            klassIdx: e.detail.value,
            subjects: this.data.klasses[e.detail.value].children,
            subjectIdx: 0
        });
        this.setNavigationBarTitle(this.data.subjects[this.data.subjectIdx].subject);
        this.requestUniversities();
    },
    bindSubjectPickerChange: function (e) {
        this.setData({
            subjectIdx: e.detail.value
        });
        this.setNavigationBarTitle(this.data.subjects[this.data.subjectIdx].subject);
        this.requestUniversities();
    },
    navigateSubject: (e) => {
        const [universityNum, university] = e.currentTarget.id.split('_');
        wx.navigateTo({
            url: `../subject/subject?universityNum=${universityNum}&university=${university}`
        });
    },
    showPoster: () => {
        wx.previewImage({
            urls: [config.POSTER_URL]
        });
    },
    onShareAppMessage: function () {
        return {
            title: `高校${this.data.subjects[this.data.subjectIdx].subject}排名`,
            path: `/pages/university/university?klassIdx=${this.data.klassIdx}&subjectIdx=${this.data.subjectIdx}`
        };
    }
});
