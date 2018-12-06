// scrape.js is the AJAX middleware.  It retrieves the CBS News website and scrapes news stories from the
// source text.  We're interested in the headline of the article as well as a link to the complete article
// on cbsnews.com.
//
// Not all of the articles have a headline, though.  I have a choice to ignore them or use the anchor link
// text as a headline.  I'm going with the second option.  They're still articles, but may not be hard news.
// An article about the domestic cat (feral strays and even pet cats) as an 'invasive species' is one example.
//
// scrape.js also uses the database module to add scrapped articles to the database.

// require the dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const chalk = require("chalk");
const scrapeDb = require("./scrapeDb.js");

function scrape ()
{   // Scrape the CBS News site

    return new Promise ((resolve, reject) =>
    {   // This procedure must complete before the page can reload.

        // Use Axios to retrieve the CBS News web page
// console.log(chalk.yellow("scraping"));
        axios
        .get("https://www.cbsnews.com")
        .then(function({data})
        {   // Now that we have the page, use Cheerio to "scrape" it

// console.log(chalk.yellow(".then()"));
            const $ = cheerio.load(data);

            $("li.item").each(function(i, element)
            {   var h2 = $(element).children("h2").text();
                var href = $(element).children("a").attr("href");
                var link = $(element).children("a").children(".title").text().trim();
                var meta = $(element).children("a").children("figure").children("p").text().trim();
                var img = $(element).children("a").children("figure").children("span").children("img").attr("src").trim();

                // Not all articles have a headline.  If that's the case, use the link text...

                if (h2 === "") h2 = link;

                scrapeDb.addNewArticle (h2, link, href, meta, img)
            })

// console.log(chalk.yellow("done scraping"));
        // console.log(JSON.stringify(scrapeDb.getAllArticles(), null, 2))
// console.log(chalk.yellow("done JSON"));
            resolve ("OK")
        })
        .catch(function(error)
        {
            console.log (chalk.red(error));
            // return "ERROR"
            reject("ERROR")
        })
    })
}

module.exports = scrape;