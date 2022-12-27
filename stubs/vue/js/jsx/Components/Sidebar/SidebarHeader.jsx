import { defineComponent } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Button from '@/Components/Button'
import {
    MenuFoldLineLeftIcon,
    MenuFoldLineRightIcon,
} from '@/Components/Icons/outline'
import { XIcon } from '@heroicons/vue/outline'
import { sidebarState } from '@/Composables'

export default defineComponent({
    setup() {
        return () => (
            <div class="flex items-center justify-between flex-shrink-0 px-3">
                <Link
                    href={route('dashboard')}
                    class="inline-flex items-center gap-2"
                >
                    <span class="sr-only">K-UI</span>
                    <ApplicationLogo aria-hidden="true" class="w-10 h-auto" />
                </Link>

                <Button
                    iconOnly
                    variant="secondary"
                    type="button"
                    v-show={sidebarState.isOpen || sidebarState.isHovered}
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
                                class={['hidden lg:block', iconSizeClasses]}
                            />

                            <MenuFoldLineRightIcon
                                aria-hidden="true"
                                v-show={!sidebarState.isOpen}
                                class={['hidden lg:block', iconSizeClasses]}
                            />

                            <XIcon
                                aria-hidden="true"
                                class={['lg:hidden', iconSizeClasses]}
                            />
                        </>
                    )}
                </Button>
            </div>
        )
    },
})
