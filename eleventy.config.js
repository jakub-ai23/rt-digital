// =============================================================
//  REAL TEAM Digital — Eleventy Configuration
//  Created: 2026-04-17
//  Last updated: 2026-04-17 (M2: added archive ignore)
// =============================================================

module.exports = function (eleventyConfig) {

  // --- Archive exclusions -----------------------------------
  // Prevent _archive/ from being processed as live pages
  eleventyConfig.ignores.add("src/_archive/**");

  // --- Passthrough copies -----------------------------------
  // Static assets: CSS, JS, images, and CNAME for GitHub Pages
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // --- Template engine config -------------------------------
  // Use Nunjucks for .html and .njk templates
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
  });

  return {
    // Template engines
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    // Directory structure
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
  };
};
