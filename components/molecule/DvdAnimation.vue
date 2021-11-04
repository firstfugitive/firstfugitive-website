<template>
    <div>
        <img id="dvd" src="~/assets/img/dvd.png" usemap="#workmap" alt="Dvd" width="1600" height="712">
        <canvas></canvas>
    </div>
</template>

<script>
export default {
  name: "DvdAnimation",
  data() {
    return {
      sys: {},
      canvas: {},
      c: {},
      cData: {},
    };
  },
  methods: {
    handleMouseDown(e) {
      e.preventDefault();
      var rect = this.canvas.getBoundingClientRect();
      // get the mouse position relative to this.canvas
      var mouseX = Number.parseInt(e.clientX - rect.left);
      var mouseY = Number.parseInt(e.clientY - rect.top);

      if (
        mouseX >= this.cData.x &&
        mouseX <= this.cData.x + this.cData.width &&
        mouseY >= this.cData.y &&
        mouseY <= this.cData.y + this.cData.height
      ) {
        // if inside, display the shape's message
        console.log("Click registered");
        
        //make invisible
        //this.canvas.getContext("2d").globalAlpha = 0;

        //make faster
        this.cData.dx++;
        this.cData.dy++;
      }
    },
    animate() {
      window.requestAnimationFrame(this.animate);
      this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.c.beginPath();
      this.c.fillStyle = "transparent";
      this.c.fillRect(this.cData.x, this.cData.y, this.cData.width, this.cData.height);

      var img = document.getElementById("dvd");
      this.c.drawImage(img, this.cData.x, this.cData.y, this.cData.width, this.cData.height);

      if (this.cData.x + this.cData.width > this.canvas.width || this.cData.x < 0) {
        // this.c.globalAlpha = Math.random();
        this.cData.dx = -this.cData.dx;
      }

      if (this.cData.y + this.cData.height > this.canvas.height || this.cData.y < 0) {
        // this.c.globalAlpha = Math.random();
        this.cData.dy = -this.cData.dy;
      }
      console.log("countRefresh");
      this.cData.x += this.cData.dx;
      this.cData.y += this.cData.dy;

      return this.cData;

    }
  },
  mounted() {
    this.canvas = document.querySelector("canvas");

    console.log("canvas", this.canvas)

    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.c = this.canvas.getContext("2d");

    
    console.log("context", this.c)

    this.cData = {
      x: 0,
      y: 0,
      dx: 4,
      dy: 4,
      width: 100,
      height: 46
    }
    

    this.cData = this.animate(this.canvas, this.c, this.cData);

    document.querySelector("canvas").addEventListener("mousedown", (e) => this.handleMouseDown(e));
    window.addEventListener("resize", (e) => {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.cData.x = 0;
        this.cData.y = 0;
    });
  },
};
</script>

<style scoped>

canvas {
    position:relative;
}

#dvd {
  display: none;
}
</style>