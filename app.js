const config = require('./utils/config');

App({
    isPlus: false,
    remarks: [],
    onLaunch: function() {
        wx.getSystemInfo({
            success: (res) => {
                if (res.screenWidth > 375) {
                    this.isPlus = true;
                }
            }
        });
        wx.request({
            url: config.REMARKS_URL,
            success: (res) => {
                if (+res.statusCode === 200) {
                    this.remarks = res.data.data;
                }
            }
        });
    }
});
