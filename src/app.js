// var FeedParser = require('feedparser');
const env = require('dotenv').config()
var request = require('request'); // for fetching the feed
var striptags = require('striptags');
if (!process.env.BROWSER) {
    global.window = {};
}
let RssFeedEmitter = require('rss-feed-emitter');
// let feeder = new RssFeedEmitter();
let feeder = new RssFeedEmitter({ userAgent: 'Your UA string'});

feeder.add({
    url: 'https://www.pelando.com.br/rss/todos',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    refresh: 10000
});
console.log(env.parsed.ROCKET_CHAT_URL_WEBHOOK);

var options = {
    url: env.parsed.ROCKET_CHAT_URL_WEBHOOK,

}

feeder.on('new-item', function(item) {
    console.log(item);
    request.post(
        env.parsed.ROCKET_CHAT_URL_WEBHOOK,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            form: {
                "icon_emoji": ":fire:",
                "text": item.title,
                "attachments": [
                    {
                        "title": striptags(item.description),
                        "title_link": item.link,
                        "image_url": item.enclosures[0].url,
                        "color": "#16d15f"
                    }
                ]
            }
        }
    )
});

feeder.list();
// feeder.destroy();

;
// var req = request(options)
// var feedparser = new FeedParser();
//
// req.on('error', function (error) {
//     // handle any request errors
// });
//
// req.on('response', function (res) {
//     var stream = this; // `this` is `req`, which is a stream
//
//     if (res.statusCode !== 200) {
//         this.emit('error', new Error('Bad status code'));
//     }
//     else {
//         stream.pipe(feedparser);
//     }
// });
//
// feedparser.on('error', function (error) {
//     // always handle errors
// });
//
// feedparser.on('readable', function () {
//     // This is where the action is!
//     var stream = this; // `this` is `feedparser`, which is a stream
//     var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
//     var item;
//     request.post(
//         'http://rocketchat.mobly.local:3000/hooks/L9QdPAHWaBHme6zvd/2jRLsEmJFNcpefXs6xT7GRMYe3snqujYuRLDd4q2NouzF4PY',
//         {form: {'username': 'teste', 'text': stream.read()}}
//     )
//     while (item = stream.read()) {
//         var data = {"username":"teste","text":item}
//
//
//     }
// });
