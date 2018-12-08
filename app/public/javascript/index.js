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
            // if(response.status != 200)
            // {   // something didn't go right on the server -- tell the user
            //     console.log(response.status)
            // }
            // else
            {   // everything seemed to go correctly...reload the page to display the data
                window.location.reload();
            }
        })
        .catch (function(error)
        {   // an error occured -- tell the user
            console.log (error)
        })
    })

    let id = "";

    $(".articles-main").on("click", ".article-button", function(event)
    {   // generic event handler for the COMMENTS buttons
        event.preventDefault();

        // const id = $(this).attr("value");
        id = $(this).attr("value");

        $.get("/api/getOneArticle/" + id)
        .then(function(data)
        {
            const imgDiv = $(".headline-image");

            const image = $("<img>");
            image.attr("src", data[0].img);

            imgDiv
                .empty()
                .append(image)

            $(".headline-text")
                .empty()
                .text(JSON.stringify(data));

            $("#articles-section").css("display", "none");
            $("#comments-section").css("display", "block");
        })
        .catch(function(error)
        {
            console.log(error)
        })
    })

    $("#submit-button").click(function(event)
    {   // event handler for .comment-form SUMBIT button
        event.preventDefault();

// alert("WTF!")
        const name = $("#name-input").val().trim();
// alert("name: " + name);
        const comment = $("#comment-input").val().trim();
// alert("comment: " + comment);
        const data = { name, comment };

        $.post("/api/addComment/" + id, data, function(data)
        {   // The data was successfully added to the database, so retrieve all comments for this article

            // Comments are indexed in the article record

            $.get("/api/getOneArticle/" + id)
            .then(function(data)
            {   console.log(JSON.stringify(data, null, 2))
            })
        })
        .catch(function(error)
        {
            console.log(error)
        })

    })
})