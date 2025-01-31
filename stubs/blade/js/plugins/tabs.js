export default function (Alpine) {
    Alpine.directive("tabs", (el, { value }) => {
        if (value === "btns") handleBtns(Alpine, el)
        else if (value === "btn") handleBtn(Alpine, el)
        else if (value === "panels") handlePanels(Alpine, el)
        else if (value === "panel") handlePanel(Alpine, el)
        else if (value === "marker") handleMarker(Alpine, el)
        else handleRoot(Alpine, el)
    }).before("bind")
}

function handleRoot(Alpine, el) {
    Alpine.bind(el, {
        class: 'relative',
        'x-data'() {
            return {
                tabId: this.$id('tabs'),
                activePanel: 1,
                setActivePanel(btn){
                    this.repositionMarker(btn)
                    this.activePanel = btn.id.replace(this.$data.$data.tabId + '-btn-', '')
                },
                activeBtn(btn){
                    return this.activePanel == btn.id.replace(this.$data.tabId + '-btn-', '')
                },
                panelActive(panel){
                    return this.activePanel == panel.id.replace(this.$data.tabId + '-panel-', '')
                },
                repositionMarker(btn){
                    if (!this.$refs.btnMarker) return
                    this.$refs.btnMarker.style.width=btn.offsetWidth + 'px'
                    this.$refs.btnMarker.style.height=btn.offsetHeight + 'px'
                    this.$refs.btnMarker.style.left=btn.offsetLeft + 'px'

                    this.$refs.btnMarker.style.top=btn.offsetTop + 'px'
                    this.$refs.btnMarker.style.bottom=btn.offsetBottom + 'px'
                },
            }
        },
    })
}

function handleBtns(Alpine, el) {
    Alpine.bind(el, {
        class: 'relative',
        'x-init'(){
            this.$data.repositionMarker(el.firstElementChild)
        },
    })
}

function handleBtn(Alpine, el) {
    Alpine.bind(el, {
        ':id'(){
            return this.$id(this.$data.tabId + '-btn')
        },
        'x-data'(){
            return {
                get active(){
                    return this.$data.activeBtn(el)
                }
            }
        },
        'x-resize'(){
            if(this.active) {
                this.$data.repositionMarker(el)
            }
        },
        '@click'(){
            this.setActivePanel(el)
        },
        'role': 'tab',
        ':aria-controls'(){
            return el.id.replace('btn', 'panel')
        },
        ':aria-selected'(){
            return this.active
        },
    })
}


function handlePanels(Alpine, el) {
    Alpine.bind(el, {
        class: 'relative'
    })
}

function handlePanel(Alpine, el) {
    Alpine.bind(el, {
        ':id'(){
            return this.$id(this.$data.tabId + '-panel')
        },
        'x-data'(){
            return {
                get active(){
                    return this.$data.panelActive(el)
                }
            }
        },
        'x-show'() {
            return this.$data.panelActive(el)
        },
        role: 'tabpanel',
        ':aria-labelledby'(){
            return el.id.replace('panel', 'btn')
        },
    })
}

function handleMarker(Alpine, el) {
    Alpine.bind(el, {
        'x-ref': 'btnMarker'
    })
}
