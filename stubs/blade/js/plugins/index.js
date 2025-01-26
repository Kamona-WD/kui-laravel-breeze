import sidebar from './sidebar'
import dropdown from './dropdown'
import perfectScroll from './perfectScroll'

export default function (Alpine) {
    Alpine.store('darkMode', {
        value: false,
        setValue(value) {
            window.localStorage.setItem('dark', value)
            document.dispatchEvent(new CustomEvent('scheme:changed', {}))
        },
        getValue() {
            if (window.localStorage.getItem('dark')) {
                return JSON.parse(window.localStorage.getItem('dark'))
            }
            return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        },
        toggle() {
            this.value = !this.value
            this.setValue(this.value)
        },
        init() {
            this.value = this.getValue()
        },
    })
    
    Alpine.data('globalState', () => {
        let lastScrollTop = 0
    
        return {
            init() {
                window.addEventListener('scroll', () => {
                    let st = window.pageYOffset || document.documentElement.scrollTop
                    if (st > lastScrollTop) {
                        // downscroll
                        this.scrollingDown = true
                        this.scrollingUp = false
                    } else {
                        // upscroll
                        this.scrollingDown = false
                        this.scrollingUp = true
                        if (st == 0) {
                            //  reset
                            this.scrollingDown = false
                            this.scrollingUp = false
                        }
                    }
                    lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
                })
            },
    
            scrollingDown: false,
    
            scrollingUp: false,
        }
    })
    
    sidebar(Alpine)
    dropdown(Alpine)
    perfectScroll(Alpine)
}
