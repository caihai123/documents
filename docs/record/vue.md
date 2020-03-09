---
title: vue
description : 这里会记录一些vue的常用语法
---
## vue常用模板
``` vue
<template>

</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
    watch: {},
};
</script>

<style scoped>

</style>
```
或者在你的vscode中添加下面的代码片段：
``` json
{
	"Print to console": {
		"prefix": "vue",
		"body": [
			"<template>\n",
			"</template>\n",
			"<script>",
			"export default {",
			"    components: {},",
			"    props: {},",
			"    data() {",
			"        return {};",
			"    },",
			"    computed: {},",
			"    created() {},",
			"    mounted() {},",
			"    methods: {},",
			"    watch: {},",
			"};",
			"</script>\n",
			"<style scoped>\n",
			"</style>\n",
		],
		"description": "vue模板"
	}
}
```