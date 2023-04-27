const { SlashCommandBuilder } = require('discord.js');
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

		await interaction.reply(response);
	},
};