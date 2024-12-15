const { REST, Routes, ApplicationCommandOptionType, SlashCommandBuilder} = require('discord.js');

const commands = [
  {
    name: 'purge',
    description: 'deletes messages from a channel',
    options: [
      {
        name: 'amount',
        description: 'the amount of messages you want to delete',
        type: ApplicationCommandOptionType.Integer,
        required: true,
      }
    ]
  }
 ];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async() => {
 try{
    console.log('Resgistering slash commands...');

    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
    )

    console.log('Slash commands were registered');
 } catch (error){
   console.log(`There was an error: ${error}`); 
 }
})();
