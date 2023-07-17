<template>
    <div class="tree">
      <TreeItem
        v-for="child in childNodes"
        :key="child.id"
        :node="child"
        :show-checkbox="config.multiple"
      />
      <div v-if="isEmpty" class="el-tree__empty-block">
        <span class="el-tree__empty-text">暂无数据</span>
      </div>
    </div>
  </template>
  
  <script>
  import TreeItem from "./TreeItem";
  
  // 节点构造函数
  let nodeIdSeed = 0;
  class Node {
    constructor(options) {
      this.value = options.value;
      this.data = options.data;
      this.parent = options.parent;
      this.tree = options.tree;
      this.id = this.tree.rowKey ? this.data[this.tree.rowKey] : nodeIdSeed++;
      this.checked = 0; // 选中状态 0:未选中 1:已选中 2:半选
      this.loading = false; // 是否在加载中，懒加载时使用
  
      this.visible = true; // 是否显示，过滤时使用
      this.expanded = false; // 是否展开
  
      // 设置节点层级
      this.level = this.parent ? this.parent.level + 1 : 1;
  
      // 是否是根节点
      this.isLeaf = (() => {
        const { children = [] } = this.data;
        if (this.tree.lazy) {
          if (typeof this.data.isLeaf === "boolean") {
            return this.data.isLeaf;
          } else {
            return false;
          }
        } else {
          return !(children.length > 0);
        }
      })();
  
      this.loaded = !this.tree.lazy; // 是否已经加载过了
  
      // 根节点
      const { children } = this.data;
      this.initChildNodes(children);
  
      // 需要在根节点创建之后再执行，阅读此函数代码时也需要记住这一点
      this.updateValue();
  
      this.tree.nodesMap[this.id] = this;
    }
  
    // 初始化value值或者说是根据value值设置选中状态
    updateValue() {
      let { value } = this;
      const { multiple, checkStrictly } = this.tree.config;
      if (multiple) {
        if (typeof value === "string") value = [value];
        this.checked = value.some((key) => this.id === key) ? 1 : 0;
        if (!checkStrictly) {
          // 父子相互关联
          const parentNodeAll = this.findParentNodeAll();
          const childrenNodeAll = this.findChildrenNodeAll();
          if (
            parentNodeAll.some((node) => value.some((key) => key === node.id))
          ) {
            // 如果父节点被选中则自己也需要选中
            this.checked = 1;
          } else if (
            // 注意：一定要判断childrenNodeAll是否为空，否则为空时会返回true，在这里是不允许的
            childrenNodeAll.length > 0 &&
            childrenNodeAll.every((node) => node.checked === 1)
          ) {
            this.checked = 1;
          } else if (childrenNodeAll.some((node) => node.checked === 1)) {
            this.checked = 2;
          }
        }
      } else {
        this.checked = value === this.id ? 1 : 0;
        if (!checkStrictly) {
          // 父子相互关联
          const parentNodeAll = this.findParentNodeAll();
          const childrenNodeAll = this.findChildrenNodeAll();
          if (parentNodeAll.some((node) => node.id === value)) {
            // 如果父节点被选中则自己也需要选中
            this.checked = 1;
          } else if (
            // 注意：一定要判断childrenNodeAll是否为空，否则为空时会返回true，在这里是不允许的
            childrenNodeAll.length > 0 &&
            childrenNodeAll.every((node) => node.checked === 1)
          ) {
            // 如果子节点全被选中则自己也需要选中，判断子节点的状态时可以使用checked判断，因为此时子组件的initValue函数已经执行完成
            this.checked = 1;
          } else if (childrenNodeAll.some((node) => node.checked === 1)) {
            // 如果子组件被选中了部分
            this.checked = 2;
          }
        }
      }
    }
  
    // 初始胡根节点
    initChildNodes(children) {
      this.childNodes = children
        ? children.map(
            (item) =>
              new Node({
                value: this.value,
                data: item,
                parent: this,
                tree: this.tree,
              })
          )
        : undefined;
    }
  
    getLabels() {
      if (this.tree.config.checkStrictly) {
        return this.data.label;
      } else {
        const parentNodeAll = this.findParentNodeAll();
        const nodeAll = [...parentNodeAll, this];
        return nodeAll.map((item) => item.data.label).join(" / ");
      }
    }
  
    // 查找所有下级节点
    findChildrenNodeAll() {
      const nodeList = [];
      (this.childNodes || []).forEach((item) => {
        nodeList.push(item);
        nodeList.push(...item.findChildrenNodeAll());
      });
      return nodeList;
    }
  
    // 查找所有父级点
    findParentNodeAll() {
      const nodeList = [];
      let { parent } = this;
      while (parent) {
        nodeList.push(parent);
        // eslint-disable-next-line prefer-destructuring
        parent = parent.parent;
      }
      return nodeList;
    }
  }
  
  export default {
    components: { TreeItem },
    props: {
      value: {
        type: [String, Array],
        required: true,
      },
      data: {
        type: Array,
        default: () => [],
      },
      props: {
        type: [Object, null],
        default: null,
      },
      // eslint-disable-next-line vue/no-unused-properties
      rowKey: {
        type: String,
        default: "",
      },
      // 是否是懒加载，需要配合load使用，为true是options将失效
      lazy: {
        type: Boolean,
        default: false,
      },
      // 懒加载函数，需要配合lazy使用，
      load: {
        type: Function,
        default: (node, resolve) => resolve([]),
      },
      // eslint-disable-next-line vue/require-default-prop
      filterNodeMethod: Function,
    },
    data() {
      return {
        childNodes: [],
        nodesMap: {},
      };
    },
    computed: {
      config() {
        return {
          multiple: false, // 是否多选
          checkStrictly: false, // 是否父子不相互关联
          ...this.props,
        };
      },
      isEmpty() {
        const { childNodes } = this;
        return (
          !childNodes ||
          childNodes.length === 0 ||
          childNodes.every(({ visible }) => !visible)
        );
      },
    },
    watch: {
      value(val) {
        this.updateValue(val);
      },
      data(options) {
        if (!this.lazy) {
          this.initNode(options);
          this.$emit("loaded");
        }
      },
    },
    created() {
      if (this.lazy) {
        this.load(null, (options) => {
          this.initNode(options);
          this.$emit("loaded");
        });
      } else {
        this.initNode(this.data);
      }
    },
    methods: {
      // 初始化节点
      initNode(children = []) {
        this.childNodes = children.map((item) => {
          return new Node({
            value: this.value,
            data: item,
            tree: this,
          });
        });
      },
  
      // 更新value值，更准确的说是通过value更新树的状态
      updateValue(val = this.value) {
        const deep = (arr = []) => {
          arr.forEach((node) => {
            deep(node.childNodes);
            node.value = val;
            node.updateValue();
          });
        };
        deep(this.childNodes);
      },
  
      // 获取当前value值的显示label
      // eslint-disable-next-line vue/no-unused-properties
      getCurrentLables() {
        let { value } = this;
        const { multiple } = this.config;
        if (multiple) {
          if (typeof value === "string") value = [value];
          return value.map((key) => {
            const node = this.nodesMap[key];
            return {
              value: key,
              label: node ? node.getLabels() : key,
            };
          });
        } else {
          const node = this.nodesMap[value];
          return node ? node.getLabels() : value;
        }
      },
  
      // eslint-disable-next-line vue/no-unused-properties
      filter(value, reserve = true) {
        const { filterNodeMethod } = this;
        if (filterNodeMethod) {
          const traverse = function(node) {
            const { childNodes = [], isLeaf } = node;
            node.visible = filterNodeMethod.call(node, value, node.data, node);
            if (node.visible && reserve) {
              // 如果上级已经匹配并且reserve为true,则保留所有下级
              node.findChildrenNodeAll().forEach((child) => {
                child.visible = true;
              });
              node.expanded = false;
              return;
            }
            childNodes.forEach((child) => traverse(child));
            if (!node.visible && childNodes.length) {
              node.visible = childNodes.some((node) => node.visible);
            }
            if (!value) return;
            if (node.visible && node.loaded && !isLeaf) node.expanded = true;
          };
          this.childNodes.forEach((node) => traverse(node));
        } else {
          throw new Error("filterNodeMethod 不存在!");
        }
      },
    },
  };
  </script>
  