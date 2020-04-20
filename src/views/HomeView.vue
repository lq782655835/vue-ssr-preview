<template>
  <div class="home-view">
    <component
      v-for="oneComponent in components"
      :key="oneComponent.id"
      :is="oneComponent.name"
      :data-component-id="oneComponent.id"
      :data-component-name="oneComponent.name"
      v-bind="oneComponent.data">
    </component>
  </div>
</template>

<script>
const list = Array(10).fill('').map(s => ({
            author: '张三',
            date: '15年8月11日 11:23',
            content: '总裁审批：批准',
            remark: '我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好',
          }))
const mycomponents = [{
  id: 1,
  name: 'ks-operation-log',
  data: {
    list
  }
}, {
  id: 2,
  name: 'ks-clipboard',
  data: {
    content: 'hale'
  }
}]
export default {
  title() {
    return 'Koa Vue SSR'
  },
  data() {
    const components = (typeof window !== 'undefined') ?
      window.INIT_DATA || mycomponents : mycomponents;
    return {
      components
    };
  }
}
</script>

<style lang="postcss">
.home-view {
  margin-top: 1rem;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;

  & h1, & h3 {
    font-weight: normal;
  }

  & p {
    font-size: 18px;
    text-align: center;
    width: 65%;
    margin: 0 auto;
  }
}

</style>
