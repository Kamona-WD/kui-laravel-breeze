import { defineComponent } from 'vue'
import PerfectScrollbar from '@/Components/PerfectScrollbar'
import SidebarLink from '@/Components/Sidebar/SidebarLink'
import SidebarCollapsible from '@/Components/Sidebar/SidebarCollapsible'
import SidebarCollapsibleItem from '@/Components/Sidebar/SidebarCollapsibleItem'

export default defineComponent({
    setup() {
        return () => (
            <PerfectScrollbar
                tagname="nav"
                aria-label="main"
                class="flex flex-col flex-1 max-h-full gap-4 px-3"
            >
                <SidebarLink
                    title="Dashboard"
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                    icon="tabler--home"
                />

                <SidebarCollapsible
                    title="Components"
                    active={route().current('components.*')}
                    icon="tabler--grid"
                >
                    <SidebarCollapsibleItem
                        href={route('components.buttons')}
                        title="Buttons"
                        active={route().current('components.buttons')}
                    />
                </SidebarCollapsible>
            </PerfectScrollbar>
        )
    },
})
