<!-- 
  用于在el-table中的树型结构显示指示线；
  注意：最好保证表格中每一行行高相等，否则可能会出现线条错位的情况
-->
<script>
const offset = 4;
export default {
  props: {
    indent: {
      type: Number,
      default: 16,
    },
    scope: {
      type: Object,
      required: true,
    },
    border: {
      type: String,
      default: "1px dashed #c0c4cc",
    },
  },
  render(h) {
    const { level = 0 } = this.scope.treeNode || {};
    const { treeData = {}, rowKey } = this.scope.store.states;

    const domList = [];

    if (level >= 1) {
      domList.push(
        h("div", {
          class: "horizontal-line",
          style: {
            left: level * this.indent + offset + "px",
            borderBottom: this.border,
          },
        })
      );
    }

    let currentId = this.scope.row[rowKey];
    while (currentId) {
      const parentId = Object.keys(treeData).find((key) => {
        return treeData[key].children.includes(currentId);
      });

      if (
        parentId &&
        (treeData[parentId].children[treeData[parentId].children.length - 1] !==
          currentId ||
          currentId === this.scope.row[rowKey])
      ) {
        domList.push(
          h("div", {
            class: "vertical-line",
            style: {
              left:
                (treeData[parentId].level + 1) * this.indent + offset + "px",
              borderLeft: this.border,
            },
          })
        );
      }
      currentId = parentId;
    }

    return h("div", { class: "tree-table-line" }, domList);
  },
};
</script>

<style scoped>
.tree-table-line {
  display: inline-block;
}

.horizontal-line {
  display: inline-block;
  width: 16px;
  position: absolute;
  top: 50%;
  pointer-events: none;
}
.vertical-line {
  display: inline-block;
  width: 1px;
  height: 100%;
  position: absolute;
  top: -50%;
  pointer-events: none;
}
</style>
