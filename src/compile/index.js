// <div id="app">Hello Word{{message}} <h1></h1></div>
// ast语法树 {} vnode {}
/**
 * {
 *    tag: 'div',
 *    attrs: [{id: "app"}],
 *    children: [{tag: null, text: "Hello Word"}]
 * }
 */

// Regular Expressions for parsing tags and attributes
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // <div id="app"> </div>
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
const ncname = "[a-zA-Z_][\\w\\-\\.]*"; // 标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头正则表达式
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签的结尾
const doctype = /^<!DOCTYPE [^>]+>/i;
const comment = /^<!--/;
const conditionalComment = /^<!\[/;

function start(tag, attrs) {
  // 开始标签
  console.log("开始标签");
}
// 获取文本
function charts(text) {
  console.log(text, "文本");
}
function end(tag) {
  console.log("结束标签");
}

// 遍历
function parseHTML(html) {
  while (html) {
    // html 为空的时候结束
    // 判断标签
    let textEnd = html.indexOf("<"); // 0;
    if (textEnd === 0) {
      // 标签
      // 1.开始标签
      const startTagMatch = parseStartTag(); // 找到开始标签的内容
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      // 结束标签
      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
      }
    }
    let text;
    // 文本
    if (textEnd > 0) {
      // 获取文本内容
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      charts(text);
    }
  }

  function parseStartTag() {
    // 解析开始标签
    const start = html.match(startTagOpen); // 1.结果 2.false
    if (start) {
      // 创建ast语法树
      let match = {
        tagName: start[1],
        attrs: [],
      };
      // 删除我们开始标签
      advance(start[0].length);
      // 属性
      // 注意 多个 遍历
      // 注意 >
      let attr;
      let end;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  function advance(n) {
    html = html.substring(n);
  }
}

export function compileToFunction(el) {
  let ast = parseHTML(el);
}
