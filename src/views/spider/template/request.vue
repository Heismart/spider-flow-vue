<template>
  <div>
    <a-input v-model="cell.value" placeholder="请输入爬虫名称" />
    <a-input v-cell:url placeholder="输入URL" />

  </div>
</template>

<script>

export default {
  name: 'SfRequest',
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      item: this.cell
    }
  },
  mounted() {
    console.log(this.cell.data)
  }

}
</script>

<style scoped>

</style>
