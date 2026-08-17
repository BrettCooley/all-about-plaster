export default {

    async fetch(request, env) {

        const url = new URL(request.url);


        /* CONTACT FORM */

       if (url.pathname === "/contact" && request.method === "POST") {

    const formData = await request.json();

    const fullName = formData.fullName;
    const customerEmail = formData.email;
    const phone = formData.phone;
    const message = formData.message;
    const services = formData.services || [];

    const serviceList =
        services.length > 0
            ? services.join(", ")
            : "No service selected";

    await env.SEND_EMAIL.send({

        from: "website@allaboutplaster.com",

        to: "allaboutplasterservices@gmail.com",

        replyTo: customerEmail,

        subject: `New website enquiry - ${fullName}`,

        text: `
New enquiry from All About Plaster

Name: ${fullName}
Email: ${customerEmail}
Phone: ${phone || "Not provided"}

Services:
${serviceList}

Message:
${message}
        `

    });

    return new Response(
        JSON.stringify({ success: true }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}


        /* NORMAL WEBSITE */

        return env.ASSETS.fetch(request);

    }

};