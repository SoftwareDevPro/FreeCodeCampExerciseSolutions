
const fastify = require('fastify');

function build_fastify () {
    
    const f = fastify({ logger: true });
  
    f.get("/api/whoami", async (request, reply) => {

      require('dns').lookup(require('os').hostname(), function (err, address, fam) {
        
        const software = request.headers['user-agent'].split(' ');
        
        is_lang_undef = typeof(request.headers['accept-language']) === 'undefined'; 
        
        const data = {
            // ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            ipaddress: address,
            language: (is_lang_undef ? '' : request.headers['accept-language'].split(',')[0]),
            software: software.join(' ')
        }
       
        reply.code(200).send(data);  
    
      });

    });

  return f
}

module.exports = build_fastify
