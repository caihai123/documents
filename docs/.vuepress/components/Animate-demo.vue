<template>
  <div>
    <div class="my-element">Animate.css</div>
    <div>
      <button v-for="item in options" :key="item" @click="choose(item)">{{ item }}</button>
    </div>
  </div>
</template>

<script>
import "animate.css";
const className = [
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shake",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "bounceOut",
  "bounceOutDown",
  "bounceOutLeft",
  "bounceOutRight",
  "bounceOutUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeOut",
  "fadeOutDown",
  "fadeOutDownBig",
  "fadeOutLeft",
  "fadeOutLeftBig",
  "fadeOutRight",
  "fadeOutRightBig",
  "fadeOutUp",
  "fadeOutUpBig",
  "flipInX",
  "flipInY",
  "flipOutX",
  "flipOutY",
  "lightSpeedIn",
  "lightSpeedOut",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "rotateOut",
  "rotateOutDownLeft",
  "rotateOutDownRight",
  "rotateOutUpLeft",
  "rotateOutUpRight",
  "hinge",
  "jackInTheBox",
  "rollIn",
  "rollOut",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "zoomOut",
  "zoomOutDown",
  "zoomOutLeft",
  "zoomOutRight",
  "zoomOutUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
  "slideOutDown",
  "slideOutLeft",
  "slideOutRight",
  "slideOutUp",
  "heartBeat",
];
export default {
  name: "",
  data() {
    return {
      options: className,
      element: null,
    };
  },
  mounted() {
    this.element = this.$el.querySelector(".my-element");

    this.element.addEventListener("animationend", () => {
      this.element.className = "my-element";
    });
  },
  methods: {
    choose(className) {
      this.element.classList.add('animated', className)
    },
  },
};
</script>

<style scoped>
.my-element {
  padding: 10px 0;
  font-size: 48px;
  color: #fc6c7c;
}
</style>
