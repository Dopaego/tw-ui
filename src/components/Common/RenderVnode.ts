import { defineComponent } from 'vue'
const RenderVode = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props) {
    return () => props.vNode
  },
})
export default RenderVode
