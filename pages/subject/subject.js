const app = getApp();
const config = require('../../utils/config');
const base64 = require('../../utils/base64.min');

Page({
    data: {
        universityNum: 10001,
        university: '北京大学',
        subjects: [],
        background_plus: app.isPlus ? 'background-plus' : '',
        remark: []
    },
    onLoad: function (opts) {
        this.setData({
            universityNum: +opts.universityNum,
            university: opts.university
        });
        wx.setNavigationBarTitle({
            title: `${this.data.university}学科排名`
        });
        for (let item of app.remarks) {
            if (item.university === this.data.university) {
                this.setData({
                    remark: item.remark.map(val => {
                        let rVal = {...val};
                        rVal.incident = base64.decode(rVal.incident);
                        return rVal;
                    })
                });
                break;
            }
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
    previewWiki: function (e) {
        wx.previewImage({
            urls: [config.getWikiUrl(e.currentTarget.id)]
        });
    },
    onShareAppMessage: function () {
        return {
            title: `${this.data.university}学科排名`,
            path: `/pages/subject/subject?universityNum=${this.data.universityNum}&university=${this.data.university}`
        };
    }
});
