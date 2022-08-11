const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Créditos.'),
  async execute(interaction, client) {
    const embed = new client.discord.MessageEmbed()
      .setColor('5964f4')
      .setDescription('Desenvolvido por <:heart:901205849404493854> par Siri#1111\n\n[<:github:901207749675851816>](https://github.com/ThiagoGTH)  [<:twitter:901207826729418752>](https://twitter.com/thiargo)')
      .setFooter(client.config.footerText, client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  },
};