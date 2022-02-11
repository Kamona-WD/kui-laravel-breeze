import PerfectScrollbar from '@/Components/PerfectScrollbar';
import { DashboardIcon } from '@/Components/Icons/outline';
import {
    SidebarLink,
    SidebarCollapsibleItem,
    SidebarCollapsible,
} from '@/Components/Sidebar/Sidebar';
import { TemplateIcon } from '@heroicons/react/outline';

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
                icon={
                    <DashboardIcon
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6"
                    />
                }
            />

            <SidebarCollapsible
                title="Components"
                active={route().current('components.*')}
                icon={<TemplateIcon aria-hidden="true" className="w-6 h-6" />}
            >
                <SidebarCollapsibleItem
                    href={route('components.buttons')}
                    title="Buttons"
                    active={route().current('components.buttons')}
                />
            </SidebarCollapsible>
        </PerfectScrollbar>
    );
};
