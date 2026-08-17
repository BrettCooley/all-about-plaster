export default {

    async fetch(request, env) {

        const url = new URL(request.url);


        /* CONTACT FORM */

        if (url.pathname === "/contact" && request.method === "POST") {

            return new Response("Contact endpoint works", {
                status: 200
            });

        }


        /* NORMAL WEBSITE */

        return env.ASSETS.fetch(request);

    }

};