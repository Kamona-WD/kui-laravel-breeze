import { useEffect, useRef } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'

export default (props) => {
    const { tag: Tag = 'div' } = props

    const el = useRef()

    let ps = null

    const update = () => {
        if (ps) {
            ps.update()
        }
    }

    useEffect(() => {
        ps = new PerfectScrollbar(el.current, props.settings || {})

        return () => {
            ps.destroy()
        }
    }, [])

    return (
        <Tag
            className={`relative ${props.className}`}
            onMouseOver={update}
            ref={el}
        >
            {props.children}
        </Tag>
    )
}
