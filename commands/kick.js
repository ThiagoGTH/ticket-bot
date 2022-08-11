const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulse uma pessoa.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Membro para expulsar')
      .setRequired(true))
    .addStringOption(option =>
        option.setName('raison')
        .setDescription('Motivo da expulsão')
        .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
      content: 'Você não tem a permissão necessária para executar este comando! (`KICK_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'A pessoa que você está tentando expulsar tem um cargo maior que o seu!',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: 'A pessoa que você quer expulsar possui um cargo maior que o meu, então não posso chutar.',
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      user.kick(interaction.options.getString('raison'))
      interaction.reply({
        content: `**${user.user.tag}** foi expulso com sucesso!`
      });
    } else {
      user.kick()
      interaction.reply({
        content: `**${user.user.tag}** foi expulso com sucesso!`
      });
    };
  },
};