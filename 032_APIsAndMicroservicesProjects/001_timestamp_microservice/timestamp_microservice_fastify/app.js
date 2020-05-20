
const fastify = require('fastify');

function build_fastify () {
    
    const f = fastify({ logger: true });
  
    f.get("/api/timestamp/:date_string", async (request, reply) => {

        let d;

        if (request.params.date_string.indexOf('-') === -1 && ! isNaN(parseInt(request.params.date_string))) {
            d = new Date(parseInt(request.params.date_string));    
        } else {
            d = new Date(request.params.date_string);
        }
        
        if (isNaN(d)) {
            reply.code(400).send({ error: "Invalid Date" });
        } else {
            reply.code(200)
                .send({ unix: d.getTime(),
                        utc: d.toUTCString(),
                    });
        }
    });

    f.get("/api/timestamp", async (request, reply) => {
        let d = new Date();
        reply.code(200).send({ unix: d.getTime(), utc: d.toUTCString() });
    });

  return f
}

module.exports = build_fastify
