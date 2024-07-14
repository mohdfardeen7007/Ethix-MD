const tagAll = async (m, gss) => {
  try {
    // Ensure the function is async
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    
    // Check for the valid command
    const validCommands = ['tagall'];
    if (!validCommands.includes(cmd)) return;


    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;
    
        if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");

    if (!botAdmin) return m.reply("*𝐁ⱺ𝗍 𝐊ⱺ 𝐀ᑯꭑ𝗂𐓣 𝐁α𐓣α 𝐏αɦᥣ𝖾 𝐂ɦυ𝗍𝗂𝗒𝖾*");
    if (!senderAdmin) return m.reply("*𝐁𝗂𐓣α 𝐀ᑯꭑ𝗂𐓣 𝐊𝖾 𝐓α𝗀αᥣᥣ 𝐊α𝗋𝖾𝗀α? 𝐏αɦᥣ𝖾 𝐀ᑯꭑ𝗂𐓣 𝐓ⱺɦ 𝐁α𐓣𝗃α*");
    // Extract the message to be sent
    let message = `ㅤ࣪ㅤ🧺ᩙㅤׅㅤ࣪ *𝐀𝗍𝗍𝖾𐓣𝗍𝗂ⱺ𐓣 𝐄𝗏𝖾𝗋𝗒ⱺ𐓣𝖾* 𝆹𝅥𝆺𝅥  ׅ    ׁ  🕯️\n\n*𝐌𝖾𝗌𝗌α𝗀𝖾:* ${m.body.slice(prefix.length + cmd.length).trim() || '𝐍ⱺ 𝐌𝖾𝗌𝗌α𝗀𝖾'}\n\n`;
        


    for (let participant of participants) {
      message += `ㅤ࣪ㅤ🧺ᩙㅤׅㅤ࣪ @${participant.id.split('@')[0]}\n`;
    }

    await gss.sendMessage(m.from, { text: message, mentions: participants.map(a => a.id) }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    await m.reply('An error occurred while processing the command.');
  }
};

export default tagAll;
