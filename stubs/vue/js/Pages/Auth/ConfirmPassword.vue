<template>
    <Head title="Confirm Password" />

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        This is a secure area of the application. Please confirm your password before continuing.
    </div>

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
        <div class="grid gap-4">
            <div class="space-y-2">
                <BreezeLabel for="password" value="Password" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="password" type="password" class="block w-full" placeholder="Password" v-model="form.password" required autocomplete="current-password" autofocus />
                </BreezeInputIconWrapper>
            </div>

            <div>
                <BreezeButton class="w-full justify-center" :disabled="form.processing">
                    Confirm
                </BreezeButton>
            </div>
        </div>
    </form>
</template>

<script>
import BreezeInputIconWrapper from '@/Components/InputIconWrapper.vue'
import BreezeButton from '@/Components/Button.vue'
import BreezeGuestLayout from '@/Layouts/Guest.vue'
import BreezeInput from '@/Components/Input.vue'
import BreezeLabel from '@/Components/Label.vue'
import BreezeValidationErrors from '@/Components/ValidationErrors.vue'
import { Head } from '@inertiajs/inertia-vue3';
import { LockClosedIcon } from '@heroicons/vue/outline';

export default {
    layout: BreezeGuestLayout,

    components: {
        BreezeInputIconWrapper,
        BreezeButton,
        BreezeInput,
        BreezeLabel,
        BreezeValidationErrors,
        Head,
        LockClosedIcon,
    },

    data() {
        return {
            form: this.$inertia.form({
                password: '',
            })
        }
    },

    methods: {
        submit() {
            this.form.post(this.route('password.confirm'), {
                onFinish: () => this.form.reset(),
            })
        }
    }
}
</script>
