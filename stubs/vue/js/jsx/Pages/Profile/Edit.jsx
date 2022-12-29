import { defineComponent } from 'vue'
import AuthenticatedLayout from '@/Layouts/Authenticated'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import DeleteUserForm from './Partials/DeleteUserForm'

export default defineComponent({
    props: {
        mustVerifyEmail: Boolean,
        status: String,
    },

    setup(props) {
        return () => (
            <AuthenticatedLayout
                title="Profile"
                v-slots={{
                    header: () => (
                        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Profile
                        </h2>
                    ),
                }}
            >
                <div class="space-y-6">
                    <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={props.mustVerifyEmail}
                            status={props.status}
                            class="max-w-xl"
                        />
                    </div>

                    <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm class="max-w-xl" />
                    </div>

                    <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm class="max-w-xl" />
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    },
})
