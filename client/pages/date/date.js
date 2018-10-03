Page({
  data: {
    community: [
      { id: 131623, name: '文学圈', power: 1 },
      { id: 131624, name: '文艺圈', power: 1 },
    ]
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
   radioChange: function (e) {
    var str = null;
    for (var value of this.data.items) {
      if (value.name === e.detail.value) {
        str = value.introduce;
        break;
      }
    }
    this.setData({ radioStr: str });
    if (value.name === this.data.items[1].name) {
      this.setData({ radioStr: '2' });
    }
    else if (str === '部分圈子不可见') {
      this.setData({ radioStr: '3' });
    }
  },
})
