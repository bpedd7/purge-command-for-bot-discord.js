//THINGS YOU NEED TO GET THE BOT ONLINE 
const { 
    Client, 
    IntentsBitField, 
    EmbedBuilder, 
    ActivityType, 
    ButtonBuilder, 
    ButtonStyle, 
    ActionRowBuilder,
    PermissionsBitField,
    ChannelType,
    SlashCommandBuilder,
} = require('discord.js');

const axios = require('axios');

//BOT CONFIGS
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.GuildModeration
    ]
});



//COMMAND HANDLER
client.on('interactionCreate', async (interaction) => {
    console.log(interaction.commandName);
    if (!interaction.isCommand()) return;

    const author = interaction.user;
    const { commandName, options, member } = interaction;

    try {
        switch(commandName) {
            case: 'purge'
            await handlepurgecommand(interaction)
            break;
            default:
                await interaction.reply({ content: 'Unknown command', ephemeral: true });
        }
    } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        await handleCommandError(interaction);
    }
});


//PURGE COMMAND
async function handlepurgecommand(interaction) {
    const amount = interaction.options.getInteger('amount');

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        return interaction.editReply({
            content: 'You need Manage Messages permission to use this command',
            ephemeral: true
        })
    }

    if (amount < 1 || amount > 100){
        return interaction.reply({
            content: 'Please provide a number between 1 and 100.',
            ephemeral: true
        });
    }
    try {
        const deletedMessages = await interaction.channel.bulkDelete(amount, true);

        const embed = new EmbedBuilder()
        .setColor('#DFC5FE')
        .setTitle('<:Sage_Trash:1316224299094249473> Messages Purged Sucessfully')
        .setDescription(`Deleted **${deletedMessages.size}** messages`)
        .setFooter({text: `Purged by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});

        const confirmationMessage = await interaction.channel.send({embeds: [embed]});

        setTimeout(() => confirmationMessage.delete().catch(console.error), 10000);
    }catch (error) {
        console.error('Error purging messages', error);
        return interaction.reply({
            content: 'There was and error purging messages. Ensure I have the proper permissions to delete messages. ',
            ephemeral: true
        });
    }
}
client.login(BOTTOKEN)
