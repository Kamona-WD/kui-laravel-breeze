import { defineComponent } from 'vue'
import Button from '@/Components/Button'
import {
    MenuFoldLineLeftIcon,
    MenuFoldLineRightIcon,
} from '@/Components/icons'
import { sidebarState } from '@/Composables'

export default defineComponent({
    setup() {
        return () => (
            <div class="flex-shrink-0 px-3 lg:hidden">
                <Button
                    variant="transparent"
                    type="button"
                    v-show={!sidebarState.isOpen}
                    onClick={() => {
                        sidebarState.isOpen = !sidebarState.isOpen
                    }}
                    srText={
                        sidebarState.isOpen ? 'Close sidebar' : 'Open sidebar'
                    }
                    class="p-2"
                >
                    {({ iconSizeClasses }) => (
                        <>
                            <MenuFoldLineLeftIcon
                                aria-hidden="true"
                                v-show={sidebarState.isOpen}
                                class={iconSizeClasses}
                            />

                            <MenuFoldLineRightIcon
                                aria-hidden="true"
                                v-show={!sidebarState.isOpen}
                                class={iconSizeClasses}
                            />
                        </>
                    )}
                </Button>
            </div>
        )
    },
})
