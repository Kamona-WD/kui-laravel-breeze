<script setup>
import { Head, Link } from '@inertiajs/vue3'
import { MoonIcon, SunIcon } from '@heroicons/vue/outline'
import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import PageFooter from '@/Components/PageFooter.vue'
import Button from '@/Components/Button.vue'
import { toggleDarkMode, isDark } from '@/Composables'

defineProps({
    title: String
})
</script>

<template>
    <Head :title="title" />

    <div
        class="flex flex-col items-center justify-center min-h-screen gap-4 py-6 bg-gray-100 dark:bg-dark-eval-0"
    >
        <div class="flex-shrink-0">
            <Link href="/">
                <ApplicationLogo class="w-20 h-20" />
            </Link>
        </div>

        <main class="flex items-center flex-1 w-full sm:max-w-md">
            <div
                class="w-full px-6 py-4 overflow-hidden bg-white shadow-md  sm:rounded-lg dark:bg-dark-eval-1"
            >
                <slot />
            </div>
        </main>

        <PageFooter />

        <div class="fixed right-10 top-10">
            <Button
                iconOnly
                variant="secondary"
                type="button"
                @click="toggleDarkMode"
                v-slot="{ iconSizeClasses }"
                class="hidden md:inline-flex"
                srText="Toggle dark mode"
            >
                <MoonIcon
                    v-show="!isDark"
                    aria-hidden="true"
                    :class="iconSizeClasses"
                />
                <SunIcon
                    v-show="isDark"
                    aria-hidden="true"
                    :class="iconSizeClasses"
                />
            </Button>
        </div>
    </div>
</template>
