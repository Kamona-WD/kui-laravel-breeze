import { defineComponent } from 'vue'
import { Head } from '@inertiajs/inertia-vue3'
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

                <div class="min-h-screen text-gray-900 bg-gray-100 dark:bg-dark-eval-0 dark:text-gray-100">
                    <Sidebar />

                    <div
                        style="transition-property: margin; transition-duration: 150ms"
                        class={[
                            'min-h-screen flex flex-col',
                            {
                                'lg:ml-64': sidebarState.isOpen,
                                'md:ml-16': !sidebarState.isOpen,
                            },
                        ]}
                    >
                        <Navbar />

                        {slots.header && (
                            <header>
                                <div class="p-4 sm:p-6">{slots.header()}</div>
                            </header>
                        )}

                        <main class="flex-1 px-4 sm:px-6">
                            {slots.default?.()}
                        </main>

                        <PageFooter />
                    </div>
                </div>
            </>
        )
    },
})
