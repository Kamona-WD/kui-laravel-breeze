import { defineComponent } from 'vue'
import { Head } from '@inertiajs/vue3'
import Sidebar from '@/Components/Sidebar/Sidebar'
import Navbar from '@/Components/Navbar/Navbar'
import PageFooter from '@/Components/PageFooter'
import { sidebarState } from '@/Composables'

export default defineComponent({
    props: {
        title: String,
    },

    setup(props, { slots }) {
        return () => (
            <>
                <Head title={props.title} />

                <div class="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-dark-0 dark:text-gray-100">
                    <Sidebar />

                    <div
                        class={[
                            'flex min-h-screen flex-1 flex-col transition-[margin] duration-150 md:ms-16',
                            {
                                'lg:ml-64': sidebarState.isOpen,
                            },
                        ]}
                    >
                        <Navbar />

                        <div class="container mx-auto flex flex-1 flex-col items-center gap-4 p-4 sm:gap-6 sm:p-6">
                            {slots.header && (
                                <header class="w-full flex-shrink-0">
                                    {slots.header()}
                                </header>
                            )}

                            <main class="w-full flex-1">
                                {slots.default?.()}
                            </main>

                            <PageFooter />
                        </div>
                    </div>
                </div>
            </>
        )
    },
})
