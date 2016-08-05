from flask import Flask, send_from_directory
from TwitterSearch import *
import json
import sys

app = Flask(__name__)
app.debug = True


# Serve Kibana
@app.route('/web/<path:path>')
def send_kibana(path):
    return send_from_directory('../', path)


@app.route('/getTweets/<tag>', methods=['GET', 'POST'], strict_slashes=False)
def jobInteraction(tag):

    tags = tag.split(",")
    tweets = []

    try:
        tso = TwitterSearchOrder()  # create a TwitterSearchOrder object
        tso.set_keywords(tags)  # let's define all words we would like to have a look for
        tso.set_language('es')  # we want to see German tweets only
        tso.set_include_entities(True)  # and don't give us all those entity information

        # it's about time to create a TwitterSearch object with our secret tokens
        ts = TwitterSearch(
            # consumer_key='QVhq5HVolTuzE79c16YDegtia',
            # consumer_secret='bfSPCAKXca52eaa2GF4a4mGceYVy4VkENwSuQtnr2c9e34TgWq',
            # access_token='1196870581-DfDo1GQQaukRZQBWn72ugdATSJqKPb4EaMsOFRK',
            # access_token_secret='tRV1lizrsCj8maKxOkzcDvp6vGJLBgDXH0ueEzmXSQTOi'
            consumer_key='gDEFFAToqZ1j5cE9SgJkeqvBY',
            consumer_secret='jqKGAra9Kd0n4jwsQXkhairyxx0uv9D4iMme6AeE2NLDX3fPfz',
            access_token='17160146-FxfSx4Bdq7SvuENSgHvi175f7uyjwoHCHVMUYiJQP',
            access_token_secret='SREyq0DxHOurUY5E0AbT3kPDwl5IFDcPFmnehZjbaH5ab'
        )

        # this is where the fun actually starts :)
        for tweet in ts.search_tweets_iterable(tso):
            # print('@%s tweeted: %s' % (tweet['user']['screen_name'], tweet['text']))
            tweets.append(tweet)

    except TwitterSearchException as e:  # take care of all those ugly errors if there are some
        print(e)

    print len(tweets)

    return json.dumps(tweets)


app.run(host='0.0.0.0', port=int(sys.argv[1]), threaded=True)
