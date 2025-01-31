import PerfectScrollbar from 'perfect-scrollbar'

export default function (Alpine) {
    Alpine.directive('perfect-scroll', (el) => {
        // TODO: Pass the configration

        Alpine.bind(el, {
            'x-data'() {
                return {
                    ps: null,
                    update(){
                        if(this.ps) {
                            this.ps.update()
                        }
                    }
                }
            },
            'x-init'() {
                this.ps = new PerfectScrollbar(el, {
                    wheelSpeed: 2,
                    wheelPropagation: false,
                    minScrollbarLength: 20,
                })

                this.update()
            },
            '@mousemove'(){
                this.update()
            }

        })
    }).before('bind')
}
