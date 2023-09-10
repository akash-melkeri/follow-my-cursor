class FollowMyCursor {
  constructor(id, customConfig = {}) {
    // Global variables
    this.targetElement = null;
    this.config = {
      delay: 0.1,
      startPosition: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    };
    this.cursor = {
      mouseX: this.config.startPosition.x,
      mouseY: this.config.startPosition.y,
      interpolatedX: this.config.startPosition.x,
      interpolatedY: this.config.startPosition.y,
    };

    // Functions
    this.updateMousePosition = (event) => {
      this.cursor.mouseX = event.clientX;
      this.cursor.mouseY = event.clientY;
      this.targetElement.style.display = 'block';
    };

    this.updateBlobPosition = () => {
      this.cursor.interpolatedX += (this.cursor.mouseX - this.cursor.interpolatedX) * this.config.delay;
      this.cursor.interpolatedY += (this.cursor.mouseY - this.cursor.interpolatedY) * this.config.delay;
      this.targetElement.style.left = this.cursor.interpolatedX + 'px';
      this.targetElement.style.top = this.cursor.interpolatedY + 'px';
      this.targetElement.style.position = 'absolute';
      requestAnimationFrame(this.updateBlobPosition);
    };

    this.validateConfig = (customConfig) => {
      const keys1 = Object.keys(this.config);
      const keys2 = Object.keys(customConfig);
      let invalidKeys = keys2.filter((e) => !keys1.includes(e));
      let noError = true;
      if (invalidKeys.length) {
        console.error(`Config has invalid keys: ${invalidKeys}.`);
        noError = noError && false;
      }
      let customConfigKeys = Object.keys(customConfig);
      if (customConfigKeys.includes('delay')) {
        if (typeof customConfig.delay !== 'number') {
          console.error(`Delay value must be a number.`);
          noError = noError && false;
        } else if (customConfig.delay < 0 && customConfig.delay > 1) {
          console.error(`Delay value must be within the range 0 to 1. (Floating values are allowed.)`);
          noError = noError && false;
        } else {
          this.config.delay = customConfig.delay;
        }
      }
      if (customConfigKeys.includes('startPosition')) {
        if (typeof customConfig.startPosition !== 'object') {
          console.error(`Start position value must be an object.`);
          noError = noError && false;
        } else if (typeof customConfig.startPosition.x !== 'number' && typeof customConfig.startPosition.y !== 'number') {
          console.error(`Start position values (x, y) must be numbers.`);
          noError = noError && false;
        } else {
          this.config.startPosition = customConfig.startPosition;
        }
      }
      console.log("123123");
      return noError;
    };

    this.init = () => {
      document.addEventListener('mousemove', this.updateMousePosition);
      this.updateBlobPosition();
    };

    this.targetElement = document.getElementById(id);

    // Setting styles of follower div
    if (!this.targetElement) {
      console.error(`Element with id ${id} not found.`);
      return;
    }
    this.targetElement.style.display = 'none';
    this.targetElement.style.top = this.config.startPosition.y + 'px';
    this.targetElement.style.left = this.config.startPosition.x + 'px';
    this.targetElement.style.position = 'absolute';
    this.targetElement.style.pointerEvents = 'none';
    const isValid = this.validateConfig(customConfig);
    if (!isValid) {
      return;
    }
    this.updateConfig(customConfig);
    this.init();
  }

  unmount() {
    document.removeEventListener('mousemove', this.updateMousePosition);
  }
}

export default FollowMyCursor;
