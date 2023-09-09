class FollowMyCursor {
  constructor(id, custom_config = {}) {
    // Global variables
    this.targetElement = null
    this.cursor = {
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      interpolatedX: window.innerWidth / 2,
      interpolatedY: window.innerHeight / 2,
    };
    this.config = {
      delay: 0.1,
    };

    // functions
    this.updateMousePosition = (event) => {
      this.cursor.mouseX = event.clientX
      this.cursor.mouseY = event.clientY
      this.targetElement.style.display = 'block'
    };

    this.updateBlobPosition = () => {
      this.cursor.interpolatedX += (this.cursor.mouseX - this.cursor.interpolatedX) * this.config.delay
      this.cursor.interpolatedY += (this.cursor.mouseY - this.cursor.interpolatedY) * this.config.delay
      this.targetElement.style.left = this.cursor.interpolatedX + 'px'
      this.targetElement.style.top = this.cursor.interpolatedY + 'px'
      requestAnimationFrame(this.updateBlobPosition)
    };

    this.get_invalid_keys = (custom_config) => {
      const keys1 = Object.keys(this.config)
      const keys2 = Object.keys(custom_config)
      return keys2.filter((e) => !keys1.includes(e))
    };

    this.init = () => {
      document.addEventListener('mousemove', this.updateMousePosition)
      this.updateBlobPosition()
    };

    this.targetElement = document.getElementById(id)

    // Setting styles of follower div
    if (!this.targetElement) {
      console.error(`Element with id ${id} not found.`)
      return
    }
    this.targetElement.style.display = 'none'
    this.targetElement.style.position = 'absolute'
    this.targetElement.style.top = (window.innerHeight / 2) + 'px'
    this.targetElement.style.left = (window.innerWidth / 2) + 'px'
    this.targetElement.style.pointerEvents = 'none'

    const invalid_keys = this.get_invalid_keys(custom_config)
    if (invalid_keys.length) {
      console.error(`Config has invalid keys: ${invalid_keys}.`)
      return
    }
    this.init()
  }

  unmount() {
    document.removeEventListener('mousemove', this.updateMousePosition)
  }
}

export default FollowMyCursor
