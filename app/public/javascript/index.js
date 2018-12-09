function theComments (data)
{   // The comments (if there were any) were received when the article was retrieved.  All that reamins is
    // to format them for display
    
    $(".comments-div").empty();

    for (let i=0; i<data.length; i++)
    {
        const div = $("<div>")
            .addClass("the-comment");
        const p1 = $("<p>").text(data[i].name + " says:");
        const p2 = $("<p>")
            .css("font-weight", "bold")
            .text(data[i].comment);
        div
            .append(p1)
            .append(p2);

        $(".comments-div")
            .append(div);
    }
}

function getOneArticle (id, data)
{   // Get all of the data associated with one article.  That includes the article meta data and any comments

    const imgDiv = $(".headline-image");

    const image = $("<img>");
    image.attr("src", data[0].img);

    imgDiv
        .empty()
        .append(image)

    $(".headline-text").empty()

    const p1 = $("<p>")
        .addClass("headline-p")
        .text(data[0].headline);
    const p2 = $("<p>").text(data[0].meta)
    const a = $("<a>")
        .attr("href", data[0].href)
        .attr("target", "_blank")
        .text(data[0].link);
    const p3 = $("<p>").append(a)
    $(".headline-text")
        .append(p1)
        .append(p2)
        .append(p3);

    theComments (data[0].comment)

    $("#articles-section").css("display", "none");
    $("#comments-section").css("display", "block");
}

$(document).ready(function()
{
    $("#scrape-button").click(function(event)
    {   // event handler for the SCRAPE MORE button.  Request a GET operation to get the server to
        // scrape data from th CBS News site.  If all goes well, reload this page to display the data
        // (this is handlebars after all).

        event.preventDefault();

        $.get ("/api/scrape")
        .then (function(response)
        {
            window.location.reload();
        })
        .catch (function(error)
        {   // an error occured -- tell the user
            console.log (error)
        })
    })

    let id = "";

    $(".articles-main").on("click", ".comment-button", function(event)
    {   // generic event handler for the COMMENTS buttons
        event.preventDefault();

        // const id = $(this).attr("value");
        id = $(this).attr("value");

        $.get("/api/getOneArticle/" + id)
        .then(function(data)
        {
            getOneArticle(id, data);
        })
        .catch(function(error)
        {
            console.log(error)
        })
    })

    $("#article-button").click(function(event)
    {   // event handler for ARTICLE-BUTTON
        event.preventDefault();

        $("#articles-section").css("display", "block");
        $("#comments-section").css("display", "none");
    })

    $("#submit-button").click(function(event)
    {   // event handler for .comment-form SUMBIT button
        event.preventDefault();

        const name = $("#name-input").val().trim();
        const comment = $("#comment-input").val().trim();
        const data = { name, comment };

        $.post("/api/addComment/" + id, data, function(data)
        {   // The data was successfully added to the database, so retrieve all comments for this article

            // Comments are indexed in the article record

            $.get("/api/getOneArticle/" + id)
            .then(function(data)
            {   getOneArticle(id, data);
            })
        })
        .catch(function(error)
        {
            console.log(error)
        })

    })
})