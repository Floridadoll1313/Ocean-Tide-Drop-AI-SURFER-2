export async function onboardClient(clientData) {
  await createClient(clientData);
  await sendWelcomeEmail(clientData.email);
  await createProject(clientData.id);
}
