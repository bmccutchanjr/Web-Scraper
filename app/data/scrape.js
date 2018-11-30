// scrape.js is the model middleware.  It retrieves the CBS News website and scrapes news stories from the
// source text.  We're interested in the headline of the article as well as a link to the complete article
// on cbsnews.com.
//
// Not all of the articles have a headline, though.  I have a choice to ignore them or use the anchor link
// text as a headline.  I'm going with the second option.  They're still articles, but may be not hard news.
// An article about the domestic cat (feral strays and even pet cats) as an 'invasive species' is one example.
//
// scrape.js also uses the database module to add scrapped articles to the database. 

// require the dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const chalk = require("chalk");

function scrape ()
{   // Scrape the CBS News site

    // Use Axios to retrieve the CBS News web page

    axios
    .get("https://www.cbsnews.com")
    .then(function({data})
    {   // Now that we have the page, use Cheerio to "scrape" it

        const $ = cheerio.load(data);

        $("li.item").each(function(i, element)
        {   var h2 = $(element).children("h2").text();
            var href = $(element).children("a").attr("href");
            var link = $(element).children("a").children(".title").text().trim();
            if (h2 === "") h2 = link;
            var meta = $(element).children("a").children("figure").children("p").text().trim();
            var img = $(element).children("a").children("figure").children("span").children("img").attr("src").trim();

            // if (h2 === "2020 Ramps Up")
            // {
                console.log(chalk.yellow("h2: ", h2));
                console.log("href: ", href);
                console.log("link: ", link);
                console.log("meta: ", meta);
                console.log("img: ", img);
            // }
        })
    })
    .catch(function(error)
    {
        console.log (chalk.red(error));
    })
}

scrape ();