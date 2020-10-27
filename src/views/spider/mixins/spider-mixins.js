let mixins = {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        },
        colSpan: 8
      },
      size: 'small'
    }
  },
  methods: {
    // 获取cell中的值
    jsonObjHandle(key, val) {
      if (val) {
        val = val.target ? val.target.value : val
        this.cell.data.set(key, val)
      }
      return this.cell.data.get(key)
    }
  }
}
export default mixins
