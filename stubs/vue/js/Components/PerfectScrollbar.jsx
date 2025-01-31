import {
    defineComponent,
    onMounted,
    onUnmounted,
    ref,
    withModifiers,
} from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'

export default defineComponent({
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

    setup(props, { slots }) {
        const { settings, tagname: Tag } = props

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

        return () => (
            <Tag
                ref={el}
                class="relative"
                onmouseover={withModifiers(update, ['once'])}
            >
                {slots.default?.()}
            </Tag>
        )
    },
})
