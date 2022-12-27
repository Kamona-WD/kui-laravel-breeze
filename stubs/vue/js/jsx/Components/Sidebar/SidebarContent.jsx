import { defineComponent } from 'vue'
import PerfectScrollbar from '@/Components/PerfectScrollbar'
import SidebarLink from '@/Components/Sidebar/SidebarLink'
import { DashboardIcon } from '@/Components/Icons/outline'
import SidebarCollapsible from '@/Components/Sidebar/SidebarCollapsible'
import SidebarCollapsibleItem from '@/Components/Sidebar/SidebarCollapsibleItem'
import { TemplateIcon } from '@heroicons/vue/outline'

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
                    v-slots={{
                        icon: () => (
                            <DashboardIcon
                                class="flex-shrink-0 w-6 h-6"
                                aria-hidden="true"
                            />
                        ),
                    }}
                ></SidebarLink>

                <SidebarCollapsible
                    title="Components"
                    active={route().current('components.*')}
                    v-slots={{
                        icon: () => (
                            <TemplateIcon
                                aria-hidden="true"
                                class="flex-shrink-0 w-6 h-6"
                            />
                        ),
                    }}
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
