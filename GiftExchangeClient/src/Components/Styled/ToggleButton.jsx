import React,{useState} from "react"

/**
 * A toggle button 
 * @param color_on String : Default="silver" : The background color of the element when the toggle is on
 * @param color_off String : Default="gray" : The background color of the element when the toggle is off
 * @param button_color String : Default="white" : The color of the button
 * @param button_percentage Number (decimal) : Default=0.5 : A number between 0.1 and 0.9 indicating how much space on 1 should be reserved for the button on the element
 * @param curve Number : Default=0 : Indicates how round the toggle should be. 50 is a nice value for a round toggle.
 * @param checked Boolean : Default=false : Indicates if the toggle should be on (true) or off (false) by default
 * @param width Number : Default=50 : Indicates how many pixels the toggle should take in space
 * @param stateFunction Function (void taking a boolean argument) : ONLY USE THE FUNCTION NAME (do not put parenthesis next to it)!!! A stateful function updating a boolean state. This is used to store the toggle value (on/off) if needed
 * 
 */
export default function ToggleButton({color_on="silver",color_off="gray",button_color="white",curve=0,checked=false,width=50,button_percentage=0.5,stateFunction=()=>{}}){
  const [on,setOn]=useState(checked)

  const STYLE={borderRadius:curve}
  const WIDTH=width,BTNWIDTH=(WIDTH*button_percentage),BACK=WIDTH-BTNWIDTH
  const BTNSTYLE={width:BTNWIDTH, backgroundColor:button_color,boxShadow:"1px 1px 5px black"}
  

  return(<section style={{position:"absolute",backgroundColor:on?color_on:color_off,paddingLeft:on?BACK:0,paddingRight:on?0:BACK,...STYLE}} onClick={()=>{setOn(!on);stateFunction(!on)}}>
    <button style={{...BTNSTYLE,...STYLE}}>&nbsp;</button>
  </section>)
}