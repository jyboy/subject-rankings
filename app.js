App({
    isPlus: false,
    onLaunch: function() {
        wx.getSystemInfo({
            success: (res) => {
                if (res.screenWidth > 375) {
                    this.isPlus = true;
                }
            }
        });
    }
});
