export default {
  async email(message, env, ctx) {
    // Forward the incoming email to a destination address
    await message.forward("destination@example.com");

    // Or send a new email using the send_email binding
    await env.SEND_EMAIL.send({
      from: message.to,
      to: "recipient@example.com",
      subject: "New email received",
      text: `New email from ${message.from}`,
    });
  }
};
