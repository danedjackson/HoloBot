const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { getHoloCounters } = require('../../functions/holoBattles');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('holo')
		.setDescription('Replies with Pong!')
		.addStringOption(lead => 
			lead.setName('lead')
				.setDescription('Holobattle team\'s lead esper')
				.setRequired(true))
		.addStringOption(firstMember =>
			firstMember.setName('first-member')
						.setDescription('First member esper in holobattle team')
						.setRequired(true))
		.addStringOption(secondMember =>
			secondMember.setName('second-member')
						.setDescription('Second member esper in holobattle team')
						.setRequired(true)),
	async execute(interaction) {
		const leadEsper = interaction.options.getString('lead');
		const firstEsper = interaction.options.getString('first-member');
		const secondEsper = interaction.options.getString('second-member');
		
		const response = getHoloCounters(leadEsper, firstEsper, secondEsper);
		for (let x = 0; x < response.length; x++){
			const embed = new EmbedBuilder()
							.setColor(0x0099FF)
							.setTitle('Holobattle Formation Recommendations')
							.addFields(
								{ name: response[x].esper1.name, value: response[x].esper1.details, inline: true },
								{ name: response[x].esper2.name, value: response[x].esper2.details, inline: true },
								{ name: response[x].esper3.name, value: response[x].esper3.details, inline: true },
							)
							.setURL('https://playdislyte.com/')
			const esper1 = new EmbedBuilder().setURL('https://playdislyte.com/').setImage('https://static.wikia.nocookie.net/dislyte/images/b/ba/Jin_Yuyao_sprite.png/revision/latest?cb=20220321180344')
			const esper2 = new EmbedBuilder().setURL('https://playdislyte.com/').setImage('https://static.wikia.nocookie.net/dislyte/images/5/5e/Dislyte_Everett_2nd_album.jpg/revision/latest/scale-to-width-down/250?cb=20230108073112');
			const esper3 = new EmbedBuilder().setURL('https://playdislyte.com/').setImage('https://pillarofgaming.com/wp-content/uploads/2021/12/Sif-Sally.jpg');
							
			if(x > 0) {
				await interaction.channel.send({embeds: [embed, esper1, esper2, esper3]})
			} else {
				await interaction.reply( {embeds: [embed, esper1, esper2, esper3]} );
			}
		}
	},
};