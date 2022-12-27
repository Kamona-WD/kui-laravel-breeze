import { defineComponent } from 'vue'
import Button from '@/Components/Button'
import {
    MenuFoldLineLeftIcon,
    MenuFoldLineRightIcon,
} from '@/Components/Icons/outline'
import { sidebarState } from '@/Composables'

export default defineComponent({
    setup() {
        return () => (
            <div class="flex-shrink-0 px-3 lg:hidden">
                <Button
                    iconOnly
                    variant="secondary"
                    type="button"
                    v-show={!sidebarState.isOpen}
                    onClick={() => {
                        sidebarState.isOpen = !sidebarState.isOpen
                    }}
                    srText={
                        sidebarState.isOpen ? 'Close sidebar' : 'Open sidebar'
                    }
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
