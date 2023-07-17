<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div
    v-show="node.visible"
    class="el-tree-node"
    :class="{
      'is-expanded': expanded,
      'is-current': node.checked === 1 || node.checked === 2,
      'is-hidden': !node.visible,
    }"
    @click.stop="handleClick"
  >
    <div class="el-tree-node__content">
      <span
        :class="[
          { 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded },
          'el-tree-node__expand-icon',
          'el-icon-caret-right',
        ]"
        @click.stop="handleExpandIconClick"
      >
      </span>
      <el-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.checked === 2"
        :disabled="!!node.disabled"
        :true-label="1"
        :false-label="0"
        @click.native.stop
        @change="handleCheckChange"
      >
      </el-checkbox>
      <span
        v-if="node.loading"
        class="el-tree-node__loading-icon el-icon-loading"
      >
      </span>
      <span class="el-tree-node__label">
        {{ node.data.label }}
      </span>
    </div>

    <el-collapse-transition>
      <div
        v-show="expanded"
        v-if="node.childNodes && node.childNodes.length"
        class="el-tree-node__children"
        role="group"
      >
        <tree-item
          v-for="child in node.childNodes"
          :key="child.id"
          :node="child"
          :show-checkbox="showCheckbox"
        >
        </tree-item>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    node: {
      type: Object,
      required: true,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  watch: {
    "node.expanded"(val) {
      this.expanded = val;
    },
  },
  methods: {
    handleCheckChange(val) {
      const { tree } = this.node;
      let oldValue = this.node.value;
      const { checkStrictly } = tree.config;
      if (typeof oldValue === "string") oldValue = [oldValue];

      let result = oldValue;

      if (checkStrictly) {
        if (val === 1) {
          result = [...new Set([...oldValue, this.node.id])];
        } else if (val === 0) {
          result = oldValue.filter((key) => key !== this.node.id);
        }
        tree.$emit("input", result);
      } else {
        // 以下这部分的代码我有点不认可，我是先去改变了组件的check状态，然后再从组件中获取keys
        // 我希望的方式是先计算出keys,然后再通过keys渲染组件
        // eslint-disable-next-line vue/no-mutating-props
        this.node.checked = val;
        const childrenNodeAll = this.node.findChildrenNodeAll();
        childrenNodeAll.forEach((node) => (node.checked = val));

        const parentNodeAll = this.node.findParentNodeAll(); // parentNodeAll的顺序是从下往上的
        (parentNodeAll || []).forEach((node) => {
          if ((node.childNodes || []).every((item) => item.checked === 1)) {
            node.checked = 1;
          } else if (
            (node.childNodes || []).some((item) => item.checked === 1)
          ) {
            node.checked = 2;
          } else {
            node.checked = 0;
          }
        });

        const keys = [];
        // 父子节点关联时，只取选中的最上级
        const deep = (array) => {
          array.forEach((node) => {
            if (node.checked === 1) {
              keys.push(node.id);
            } else {
              deep(node.childNodes || []);
            }
          });
        };
        deep(tree.childNodes || []);
        tree.$emit("input", keys);
      }
    },

    // 处理点击事件
    handleClick() {
      const { tree } = this.node;
      const { multiple, checkStrictly } = tree.config;
      if (multiple) {
        switch (this.node.checked) {
          case 0:
            this.handleCheckChange(1);
            break;
          case 1:
            this.handleCheckChange(0);
            break;
          default:
            this.handleCheckChange(1);
            break;
        }
      } else {
        if (checkStrictly) {
          tree.$emit("input", this.node.id);
        } else {
          tree.$emit("input", this.findExclusiveRoot(this.node).id);
        }
        tree.$emit("selected", this.node.key, this.node);
      }
    },

    // 找到节点独有的根节点，
    findExclusiveRoot(node) {
      let currentNode = node;
      while (currentNode) {
        if (currentNode.parent && currentNode.parent.childNodes.length === 1) {
          currentNode = currentNode.parent;
        } else {
          return currentNode;
        }
      }
    },

    // 处理展开收起切换
    handleExpandIconClick() {
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
        if (!this.node.loaded) {
          this.loadNode();
        }
      }
    },

    // 懒加载
    loadNode() {
      const { node } = this;
      node.loading = true;
      node.tree.load(node, (children = []) => {
        node.data.children = children;
        node.initChildNodes(children);
        node.loading = false;
        node.loaded = true;
        node.isLeaf = children.length === 0;
        this.$forceUpdate();
        node.tree.updateValue(node.tree.value);
        node.tree.$emit("loaded");
      });
    },
  },
};
</script>

<style scoped>
.el-tree-node.is-current > .el-tree-node__content {
  font-weight: bold;
  color: #2b7bfb;
}

.el-tree-node,
.el-tree-node__children {
  position: relative;
}
.el-tree-node__children {
  padding-left: 16px;
}
.el-tree-node__children > .el-tree-node::after {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  top: -13px;
  left: -4px;
  border-left: 1px dashed #c0c4cc;
  pointer-events: none;
}

.el-tree-node__children > .el-tree-node:last-child::after {
  height: 26px;
}

.el-tree-node__children > .el-tree-node::before {
  content: "";
  width: 12px;
  height: 1px;
  position: absolute;
  top: 13px;
  left: -4px;
  border-top: 1px dashed #c0c4cc;
  pointer-events: none;
}
</style>
