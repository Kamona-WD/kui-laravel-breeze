import PerfectScrollbar from '@/Components/PerfectScrollbar'
import {
    SidebarLink,
    SidebarCollapsibleItem,
    SidebarCollapsible,
} from '@/Components/Sidebar/Sidebar'

export default () => {
    return (
        <PerfectScrollbar
            tag="nav"
            className="flex flex-col flex-1 max-h-full gap-4 px-3"
        >
            <SidebarLink
                title={'Dashboard'}
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
}
