const app = getApp();
const config = require('../../utils/config');

Page({
    data: {
        universityNum: 10001,
        university: '北京大学',
        subjects: [],
        background_plus: app.isPlus ? 'background-plus' : '',
        remarkIf: false
    },
    onLoad: function (opts) {
        this.setData({
            universityNum: +opts.universityNum,
            university: opts.university
        });
        wx.setNavigationBarTitle({
            title: `${this.data.university}学科排名`
        });
        if (this.data.universityNum === 10497) {
            this.setData({
                remarkIf: true
            });
        }
        this.requestSubjects();
    },
    requestSubjects: function () {
        wx.showNavigationBarLoading();
        wx.request({
            url: config.getSubjectRankingUrl(this.data.universityNum),
            success: (res) => {
                wx.hideNavigationBarLoading();
                this.setData({
                    subjects: res.data.data
                });
            }
        });
    },
    previewWiki: () => {
        wx.previewImage({
            urls: ['http://p1xf71d56.bkt.clouddn.com/images/wiki_taochongyuan.png']
        });
    },
    onShareAppMessage: function () {
        return {
            title: `${this.data.university}学科排名`,
            path: `/pages/subject/subject?universityNum=${this.data.universityNum}&university=${this.data.university}`
        };
    }
});
