const QRcode = require("qrcode");

const generateUniqueQRcode = async (userId, eventId) => {
  const payload = `${userId}-${eventId}-${Date.now()}`;

  try {
    const qr = await QRcode.toDataURL(payload);
    return qr;
  } catch (error) {
    console.error("QR Generation Failed:", err);
    return "";
  }
};

module.exports = generateUniqueQRcode;
