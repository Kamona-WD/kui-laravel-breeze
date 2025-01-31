export default function (Alpine) {
    Alpine.store('sidebar', {
        isOpen: window.innerWidth > 1024,
        isHovered: false,
        open() {
            this.isOpen = true
        },
        close() {
            this.isOpen = false
        },
        toggle() {
            this.isOpen = !this.isOpen
        },
        handleWindowResize() {
            if (window.innerWidth < 1024) {
                this.isOpen = false
            } else {
                this.isOpen = true
            }
        },
    })

    Alpine.directive('sidebar', (el, { value }) => {
        if (!value) handleRoot(Alpine, el)
    }).before('bind')
}

function handleRoot(Alpine, el) {
    Alpine.bind(el, {
        'x-data'() {
            return {
                get isOpen() {
                    return this.$store.sidebar.isOpen
                },
                get isHovered() {
                    return this.$store.sidebar.isHovered
                },
                toggle() {
                    this.$store.sidebar.toggle()
                },
                open() {
                    this.$store.sidebar.open()
                },
                close() {
                    this.$store.sidebar.close()
                },
                handleWindowResize() {
                    this.$store.sidebar.handleWindowResize()
                },
            }
        },
        'x-init'() {
            el.addEventListener('mouseenter', () => {
                if (window.innerWidth > 1024) {
                    this.$store.sidebar.isHovered = true
                }
            })
            el.addEventListener('mouseleave', () => {
                if (window.innerWidth > 1024) {
                    this.$store.sidebar.isHovered = false
                }
            })
        },
    })
}
