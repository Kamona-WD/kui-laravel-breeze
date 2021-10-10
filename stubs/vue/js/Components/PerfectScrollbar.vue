<template>
    <component :is="tagname" ref="el" @mouseover.once="update">
        <slot />
    </component>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
    props: {
        settings: {
            type: Object,
            default: {},
        },
        tagname: {
            type: String,
            default: 'div',
        },
    },
    setup(props) {
        const { settings, tagname } = props

        let ps = null

        const update = () => {
            if (ps) {
                ps.update()
            }
        }

        const el = ref(null)

        onMounted(() => {
            ps = new PerfectScrollbar(el.value, settings)
        })

        onUnmounted(() => {
            ps.destroy()
        })

        return {
            el,
            update,
        }
    },
}
</script>
