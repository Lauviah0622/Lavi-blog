const summaryTag = "<!-- summary -->";

const HTMLTagRegex = /<[/\w]+>/g;
const summaryRegex = new RegExp(
  `${summaryTag}\\n*(.+)\\n*${summaryTag}`,
  "m"
);
const markdownCommentRegex = /<!--(.+)-->/;
const cleanHTMLTag = (content) => content.replace(HTMLTagRegex, "");
const createSummaryHTML = (content) =>
  `<div class="post__summary">${content}</div>`;

let isPrint = false;
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("summary", function (post) {
    const content = post.templateContent;
    const summaryMatchRes = content.match(summaryRegex);
    
    console.log('summaryMatchRes')
    console.log(summaryMatchRes)
    let pureSummary = "";
    if (!summaryMatchRes) {
      return null;
    }
    pureSummary = cleanHTMLTag(summaryMatchRes[1].trim());
    console.log('pureSummary')
    console.log(pureSummary)
    
    const mdCommentRegexRes = pureSummary.match(markdownCommentRegex);
    if (!mdCommentRegexRes) return pureSummary;

    const markdownComment = mdCommentRegexRes[1].trim();
    console.log('markdownComment')
    console.log(markdownComment)
    return markdownComment;
    // TODO 會去除所有的 markdown tag
  });
};


