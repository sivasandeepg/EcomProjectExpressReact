export const sendEmailNotification = async (email, subject, message) => {
  try {
    await axios.post('http://localhost:5000/notifications/email', {
      email,
      subject,
      message
    });
  } catch (error) {
    console.error("Failed to send email notification", error);
  }
};
 