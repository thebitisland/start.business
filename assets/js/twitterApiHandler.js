var twitter = function () {
    /*Main object*/
    var tw = {};

    /*Variables*/
    var tweets = null;

    /*Constructor*/
    tw.init = function () {};

    $.getJSON( "assets/js/demotw.js", function( json ) {
        tweets = json.statuses;
        $('#tweets').children().each(function(index, element){
                $(element).find('h3').text(tweets[index].user.name);
                $(element).find('p').text(tweets[index].text);
                $(element).find('a').text('@' + tweets[index].user.screen_name);
                $(element).find('a').attr('href','https://twitter.com/' + tweets[index].user.screen_name);
        });
        var text = ""
        for(var i=0;i<15;i++){
            text += tweets[i].text + " "
        }
        update_wordcloud(text.removeStopWords());
    });

    /*Public Stuff*/
    tw.getTweets = function (tags) {
        if (!(tags))
            tags = 'madrid';
        else
            tags += ",madrid"

        console.log("TAGG")
        console.log(tags);
        $.ajax({
            url: "/getTweets/" + tags,
            success: function(data) {
                tweets = JSON.parse(data);
                console.log(tweets.length);

                $('#tweets').children().each(function(index, element){
                        $(element).find('h3').text(tweets[index].user.name);
                        $(element).find('p').text(tweets[index].text);
                        $(element).find('a').text('@' + tweets[index].user.screen_name);
                        $(element).find('a').attr('href','https://twitter.com/' + tweets[index].user.screen_name);
                });

                var text = ""
                for(var i=0;i<15;i++){
                    text += tweets[i].text + " "
                }
                update_wordcloud(text.removeStopWords());
            }
        });
    };

    return tw;
}();
