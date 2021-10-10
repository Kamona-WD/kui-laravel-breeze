<template>
    <PerfrectScrollbar
        tagname="nav"
        aria-label="main"
        class="relative flex flex-col flex-1 max-h-full gap-4 px-3"
    >
        <SidebarLink
            title="Dashboard"
            :href="route('dashboard')"
            :active="route().current('dashboard')"
        >
            <template #icon>
                <DashboardIcon
                    class="flex-shrink-0 w-6 h-6"
                    aria-hidden="true"
                />
            </template>
        </SidebarLink>

        <SidebarCollapsible title="Dropdown">
            <SidebarCollapsibleItem href="#" title="Link 1" :active="false" />
            <SidebarCollapsibleItem href="#" title="Link 2" :active="true" />
            <SidebarCollapsibleItem href="#" title="Link 3" :active="false" />
        </SidebarCollapsible>

        <!-- Examples -->
        <!-- <SidebarCollapsible title="Dropdown" :active="$page.url.startsWith('/users')">
            <SidebarCollapsibleItem href="#" title="List" :active="$page.url === '/users/index'" />
            <SidebarCollapsibleItem href="#" title="Create" :active="$page.url === '/users/create'" />
        </SidebarCollapsible>

        <SidebarCollapsible title="Dropdown" :active="usePage().url.value.startsWith('/users')">
            <template #icon>
                <UserIcon
                    class="flex-shrink-0 w-6 h-6"
                    aria-hidden="true"
                />
            </template>

            <SidebarCollapsibleItem href="#" title="List" :active="route().current('users.index')" />
            <SidebarCollapsibleItem href="#" title="Create" :active="route().current('users.create')" />
        </SidebarCollapsible> -->
    </PerfrectScrollbar>
</template>

<script>
import PerfrectScrollbar from '@/Components/PerfectScrollbar'
import SidebarLink from '@/Components/Sidebar/SidebarLink.vue'
import { DashboardIcon } from '@/Components/Icons/outline.jsx'
import SidebarCollapsible from '@/Components/Sidebar/SidebarCollapsible.vue'
import SidebarCollapsibleItem from '@/Components/Sidebar/SidebarCollapsibleItem.vue'

export default {
    components: {
        PerfrectScrollbar,
        SidebarLink,
        DashboardIcon,
        SidebarCollapsible,
        SidebarCollapsibleItem,
    },
}
</script>
