import PerfectScrollbar from "perfect-scrollbar";
import { useEffect, useRef } from "react";

export default (props) => {
    const { tag: Tag = "div" } = props;

    const el = useRef(null);

    let ps = null;

    const update = () => {
        if (ps) {
            ps.update();
        }
    };

    useEffect(() => {
        ps = new PerfectScrollbar("#a", props.settings || {});

        return () => {
            ps.destroy();
        };
    }, []);

    return (
        <Tag
            className={`relative ${props.className}`}
            onMouseOver={update}
            ref={el}
            id="a"
        >
            {props.children}
        </Tag>
    );
};
