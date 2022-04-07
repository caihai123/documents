<template>
  <div class="watermark-wrapper" style="position:relative">
    <slot />
    <div class="watermark" :class="markClassName" :style="watermarkStyle"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 水印宽度
    width: {
      type: Number,
      default: 120,
    },
    // 水印高度
    height: {
      type: Number,
      default: 64,
    },
    // 水印绘制时，旋转的角度，单位 °
    rotate: {
      type: Number,
      default: -22,
    },
    // 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印
    image: {
      type: String,
      default: "",
    },
    // 追加的水印元素的 z-index
    zIndex: {
      type: Number,
      default: 9,
    },
    // 水印文字内容
    content: {
      type: String,
      default: "",
    },
    // 水印文字颜色
    fontColor: {
      type: String,
      default: "rgba(0,0,0,.15)",
    },
    // 文字大小
    fontSize: {
      type: [String, Number],
      default: 16,
    },

    /////////////以下属于高级参数/////////////

    // 水印层的样式
    markStyle: {
      type: Object,
      default: () => {},
    },
    // 水印层的类名
    markClassName: {
      type: String,
      default: "",
    },
    // 水印之间的水平间距
    gapX: {
      type: Number,
      default: 212,
    },
    // 水印之间的垂直间距
    gapY: {
      type: Number,
      default: 222,
    },
    // 水印在 canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 offsetTop = gapX / 2
    offsetLeft: {
      type: Number,
      default: 0,
    },
    // 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 offsetTop = gapY / 2
    offsetTop: {
      type: Number,
      default: 0,
    },
    /** 文字样式 */
    fontStyle: {
      type: String,
      default: "normal",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["none", "normal", "italic", "oblique"].indexOf(value) !== -1;
      },
    },
    // 文字粗细
    fontWeight: {
      type: [String, Number],
      default: "normal",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return (
          ["normal", "light", "weight"].indexOf(value) !== -1 ||
          typeof value === "number"
        );
      },
    },
    // 字体
    fontFamily: {
      type: String,
      default: "sans-serif",
    },
  },
  data() {
    return {
      img: null,
    };
  },
  computed: {
    base64Url() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const ratio = this.getPixelRatio(ctx);

      const canvasWidth = `${(this.gapX + this.width) * ratio}px`;
      const canvasHeight = `${(this.gapY + this.height) * ratio}px`;
      const canvasOffsetLeft = this.offsetLeft || this.gapX / 2;
      const canvasOffsetTop = this.offsetTop || this.gapY / 2;

      canvas.setAttribute("width", canvasWidth);
      canvas.setAttribute("height", canvasHeight);

      if (ctx) {
        // 旋转字符 rotate
        ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
        ctx.rotate((Math.PI / 180) * Number(this.rotate));
        const markWidth = this.width * ratio;
        const markHeight = this.height * ratio;

        if (this.img) {
          ctx.drawImage(this.img, 0, 0, markWidth, markHeight);
          return canvas.toDataURL();
        } else if (this.content) {
          const markSize = Number(this.fontSize) * ratio;
          ctx.font = `${this.fontStyle} normal ${this.fontWeight} ${markSize}px/${markHeight}px ${this.fontFamily}`;
          ctx.fillStyle = this.fontColor;
          ctx.fillText(this.content, 0, 0);
          return canvas.toDataURL();
        }
      } else {
        // eslint-disable-next-line no-console
        console.error("当前环境不支持Canvas");
      }

      return "";
    },
    watermarkStyle() {
      return {
        zIndex: this.zIndex,
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "100%",
        height: "100%",
        backgroundSize: `${this.gapX + this.width}px`,
        pointerEvents: "none",
        backgroundRepeat: "repeat",
        backgroundImage: `url('${this.base64Url}')`,
        ...this.markStyle,
      };
    },
  },
  watch: {
    image: {
      handler() {
        if (this.image) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.referrerPolicy = "no-referrer";
          img.src = this.image;
          img.onload = () => {
            this.img = img;
          };
        } else {
          this.img = null;
        }
      },
      immediate: true,
    },
  },
  methods: {
    getPixelRatio(context) {
      if (!context) {
        return 1;
      }
      const backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
  },
};
</script>
