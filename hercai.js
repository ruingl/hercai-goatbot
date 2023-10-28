/*
    hercai release v1.2:
        • hercai port for GoatBot v2
        • parseJSON add
        • dont remove the author pls, an credit would help.
        • Easy Setup
        • Fixed by LiANE, salamat po!
        
    MIT License ruihq 2023:
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Setup here!
const apiLink = "https://hercai.onrender.com/v2/hercai?question="
const BOTPREFIX = "YOURBOTPREFIX";
const BOTNAME = "YOURBOTNAME";
const axios = require("axios");

// module ixports
module.exports = {
  config: {
    name: "hercai",
    version: "1.2",
    author: "Rui and LiANE",
    countDown: 5,
    role: 0,
    shortDescription: { vi: "", en: "hercai command" },
    longDescription: { vi: "", en: "Hercai command, used to chat with the hercai model." },
    category: "chatbot",
    guide: { vi: "", en: "{pn} <your chat>" }
  },
  // Logic here!
  onStart: async function({ api, args, event, message }) {
    const response = args.join(" ");
    if (args.length === 0) {
      message.reply("Provide a question or query.");
      return;
    }
    message.reply(`Finding an answer for: ${response}...`);
    try {
      const res = await axios.get(`${apiLink}${response}`);
      const responseData = res.data;

      // parseJSON (ruihq)
      if (typeof responseData === "object" && responseData.hasOwnProperty("content") && responseData.hasOwnProperty("reply")) {
        const { content, reply } = responseData;
        message.reply(`[Herc.ai]: ${reply}\n\n[ ${BOTPREFIX} | ${BOTNAME} ]`);
      } else {
        message.reply("Invalid response format received from the API.");
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching the response.");
    }
  }
};
