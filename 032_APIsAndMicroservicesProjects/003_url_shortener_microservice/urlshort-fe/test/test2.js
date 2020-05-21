
import { Selector, ClientFunction } from 'testcafe';

const fs = require('fs');
const getLocation = ClientFunction(() => document.location.href);

function listAllProperties(o) {
	var objectToInspect;     
	var result = [];
	
	for(objectToInspect = o; objectToInspect !== null; 
           objectToInspect = Object.getPrototypeOf(objectToInspect)) {  
        result = result.concat(
            Object.getOwnPropertyNames(objectToInspect)
        );  
    }
	
	return result; 
}

fixture `url shortener test redirect fixture`.page `http://localhost:3000/api/shorturl/${fs.readFileSync('google_short_url.txt')}`;

test('short url redirects to the original url', async t => {

    await t.expect(getLocation()).contains('www.google.com')        

});




