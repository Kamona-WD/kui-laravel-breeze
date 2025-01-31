import { defineComponent } from 'vue'
import { Link } from '@inertiajs/vue3'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Button from '@/Components/Button'
import {
    MenuFoldLineLeftIcon,
    MenuFoldLineRightIcon,
} from '@/Components/icons'
import { sidebarState } from '@/Composables'

export default defineComponent({
    setup() {
        return () => (
            <div class="flex items-center justify-between flex-shrink-0 px-3">
                <Link
                    href={route('dashboard')}
                    class="inline-flex items-center gap-2"
                >
                    <span class="sr-only">Dashboard</span>

                    <ApplicationLogo aria-hidden="true" class="w-10 h-auto" />
                </Link>

                <Button
                    variant="transparent"
                    type="button"
                    v-show={sidebarState.isOpen || sidebarState.isHovered}
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
                                class={['hidden lg:block', iconSizeClasses]}
                            />

                            <MenuFoldLineRightIcon
                                aria-hidden="true"
                                v-show={!sidebarState.isOpen}
                                class={['hidden lg:block', iconSizeClasses]}
                            />

                            <span
                                aria-hidden="true"
                                class={['iconify tabler--x lg:hidden', iconSizeClasses]}
                            ></span>
                        </>
                    )}
                </Button>
            </div>
        )
    },
})
