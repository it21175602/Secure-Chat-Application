import MessageModel from "../models/messageModel.js";
import crypto from "crypto";

// const secretKey = crypto.randomBytes(32);

// const encryptText = (text) => {
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
// };

// // Function to decrypt text
// const decryptText = (text) => {
//   const [iv, encryptedText] = text.split(":");
//   const decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     secretKey,
//     Buffer.from(iv, "hex")
//   );
//   let decrypted = decipher.update(Buffer.from(encryptedText, "hex"));
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// };

export const addMessage = async (req, res) => {
  let { chatId, senderId, text } = req.body;
  // const encryptedChat = encryptText(text);
  // text = encryptedChat;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await MessageModel.find({ chatId });
    console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
