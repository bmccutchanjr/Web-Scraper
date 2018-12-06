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
console.log(".then()")
console.log(JSON.stringify(response, null, 2))
console.log(response.status)
console.log(typeof response.status)
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
console.log(".catch()")
            console.log (error)
        })
    })
})