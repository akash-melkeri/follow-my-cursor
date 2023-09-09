// Global variables
let targetElement = null
const cursor = {
  mouseX:0,
  mouseY:0,
  interpolatedX:0,
  interpolatedY:0,
}
const config = {
  delay:0.1
}

// functions
function updateMousePosition(event){
  cursor.mouseX = event.clientX
  cursor.mouseY = event.clientY
}
function updateBlobPosition(){
  cursor.interpolatedX += (cursor.mouseX - cursor.interpolatedX) * config.delay
  cursor.interpolatedY += (cursor.mouseY - cursor.interpolatedY) * config.delay
  targetElement.style.left = cursor.interpolatedX +'px'
  targetElement.style.top = cursor.interpolatedY +'px'
  requestAnimationFrame(updateBlobPosition)
}
function get_invalid_keys(custom_config){
  let keys1 = Object.keys(config)
  let keys2 = Object.keys(custom_config)
  return keys2.filter(e=>!keys1.includes(e))
}
function init(){
  document.addEventListener('mousemove', updateMousePosition)
  updateBlobPosition()
}

class FollowMyCursor {
  constructor(id, custom_config = {}) {
    targetElement = document.getElementById(id)
    // setting styles of follower div
    targetElement.style.position = 'absolute'
    targetElement.style.pointerEvents = 'none'

    if (!targetElement) {
      console.error(`Element with id ${id} not found.`)
      return
    }
    let invalid_keys = get_invalid_keys(custom_config)
    if(invalid_keys,length){
      console.error(`Config has invalid keys : ${invalid_keys}.`)
      return
    }
    init()
  }
  unmount(){
    document.removeEventListener('mousemove', updateMousePosition)
  }
}

export default FollowMyCursor
