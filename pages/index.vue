<template>
  <div>
    <img id="dvd" src="~/assets/img/dvd.png" usemap="#workmap" alt="Dvd" width="1600" height="712">
    <canvas></canvas>
    <div class="texts">
      <span>Hello World</span>
      <span>{{ fields.text }}</span>
    </div>
  </div>
</template>

<script>
import { createClient } from "../plugins/contentful";

const client = createClient();

export default {
  name: "Home",
  data() {
    return {
      loaded: false,
      fields: {},
      metadata: {},
      sys: {},
      canvas: {},
      c: {},
      cData: {}
    };
  },
  head() {
    return {
      title: `FirstFugitive | Home`,
      htmlAttrs: {
        lang: "en",
      },
    };
  },
  async asyncData(ctx) {
    //console.log("CTX", ctx);

    const route = ctx.route.path;
    console.log("route", route);

    return route;
  },
  async fetch() {
    let pageEntries = await client.getEntries({}).then((response) => {
      const content = response.items[0];
      this.fields = content.fields;
      this.metadata = content.metadata;
      this.sys = content.sys;

      return content;
    });

    console.log("pageEntries", pageEntries);

    //if page not able to be fetched -> probably 404 error
    if (!pageEntries) {
      console.error("Error 404: Page could not be found.");
      return;
    }

    return pageEntries;
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
        this.canvas.getContext("2d").globalAlpha = 0;
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
      x: 200,
      y: 200,
      dx: 8,
      dy: 8,
      width: 200,
      height: 89
    }
    

    this.cData = this.animate(this.canvas, this.c, this.cData);

    document.querySelector("canvas").addEventListener("mousedown", (e) => this.handleMouseDown(e));
  },
};
</script>

<style >

canvas {
  display: relative;
  background: transparent;
}

body {
  margin: 0;
}

#dvd {
  display: none;
}

.texts {
  position: absolute;
  top:0;
  left:0;
}
</style>