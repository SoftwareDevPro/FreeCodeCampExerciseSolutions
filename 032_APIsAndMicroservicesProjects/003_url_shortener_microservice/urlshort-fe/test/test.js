
import { Selector, ClientFunction } from 'testcafe';

const fs = require('fs');

const getLocation = ClientFunction(() => document.location.href);

fixture `url shortener test invalid url and getting a new url fixture`.page `http://localhost:3001`;
    
test('invalid url', async t => {
      await t
      .click(Selector('#original_url'))
      .typeText(Selector('#original_url'), 'aaa')
      .click(Selector('#get_url_button'))
      .expect(Selector("#result").innerText).contains('invalid URL');
});

test('get a new short url', async t => {

    await t.click(Selector('#original_url'))
           .typeText(Selector('#original_url'), 'http://www.google.com')
           .click(Selector('#get_url_button'))
           .expect(Selector("#result").innerText).contains('original_url')
           .expect(Selector("#result").innerText).contains('http://www.google.com')
           .expect(Selector("#result").innerText).contains('short_url');


    let shorturl = await Selector("#result").innerText;
        
    fs.writeFileSync('google_short_url.txt', JSON.parse(shorturl).short_url, function(err) {
        if (err) {
            console.log(err);
        }
    });
        
});





