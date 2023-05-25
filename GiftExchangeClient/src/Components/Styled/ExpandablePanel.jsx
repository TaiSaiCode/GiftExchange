export function ExpandablePanelButton({expanding_state=[false,()=>{}],button_style={}}){
    const DEFAULT_BUTTON_STYLE={
        borderStyle: "solid",
        borderWidth: 2,
        marginLeft: 30,
        width: 25,
        height: 25,
        lineHeight: 1,
        boxShadow: "2px 2px 5px #a3a3a3",
    }
    return(<><button
        title={expanding_state[0] ? "minimiser" : "agrandir"}
        onClick={() => {expanding_state[1](!expanding_state[0]);}}
        style={{...DEFAULT_BUTTON_STYLE,...button_style}}
    >{expanding_state[0] ? "-" : "+"}</button></>)
}

export default function ExpandablePanel({expanded=false,children}){
    return expanded?(<>{children}</>):<></>
}