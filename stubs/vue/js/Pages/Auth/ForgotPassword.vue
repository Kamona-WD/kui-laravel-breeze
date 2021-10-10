<template>
    <Head title="Forgot Password" />

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
        {{ status }}
    </div>

    <BreezeValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
        <div class="grid gap-6">
            <div class="space-y-2">
                <BreezeLabel for="email" value="Email" />
                <BreezeInputIconWrapper>
                    <template #icon>
                        <MailIcon aria-hidden="true" class="w-5 h-5" />
                    </template>
                    <BreezeInput withIcon id="email" type="email" class="block w-full" placeholder="Email" v-model="form.email" required autofocus autocomplete="username" />
                </BreezeInputIconWrapper>
            </div>

            <div>
                <BreezeButton class="justify-center gap-2 w-full" :disabled="form.processing" v-slot="{ iconSizeClasses }">
                    <PaperAirplaneIcon aria-hidden="true" :class="iconSizeClasses" />
                    <span>Email Password Reset Link</span>
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
import { MailIcon, PaperAirplaneIcon } from '@heroicons/vue/outline';

export default {
    layout: BreezeGuestLayout,

    components: {
        BreezeInputIconWrapper,
        BreezeButton,
        BreezeInput,
        BreezeLabel,
        BreezeValidationErrors,
        Head,
        MailIcon,
        PaperAirplaneIcon,
    },

    props: {
        status: String,
    },

    data() {
        return {
            form: this.$inertia.form({
                email: ''
            })
        }
    },

    methods: {
        submit() {
            this.form.post(this.route('password.email'))
        }
    }
}
</script>
