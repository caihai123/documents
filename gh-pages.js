const ghpages = require("gh-pages");

ghpages.publish(
  "./docs/.vuepress/dist",
  {
    beforeAdd: () => console.log("正在将dist推送到gh-pages分支..."),
  },
  function(err) {
    if (err) {
      console.error(err);
    } else {
      console.info("推送成功！");
    }
  }
);
