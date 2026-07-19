export default () => ({
  mail: {
    imap: {
      host: process.env.IMAP_HOST,
      port: parseInt(process.env.IMAP_PORT || "993", 10),
      secure: process.env.IMAP_SECURE === "true",
    },

    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
    },
  },
});