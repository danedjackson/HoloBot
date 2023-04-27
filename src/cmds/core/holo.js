const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {image_search} = require('duckduckgo-images-api');
const { getHoloCounters } = require('../../functions/holoBattles');

const randomNumber = (max) => {
	return Math.floor(Math.random() * max);
}

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('holo')
		.setDescription('Replies suggested team formations!')
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
		await interaction.deferReply();
		const leadEsper = interaction.options.getString('lead');
		const firstEsper = interaction.options.getString('first-member');
		const secondEsper = interaction.options.getString('second-member');
		
		const response = getHoloCounters(leadEsper, firstEsper, secondEsper);
		for (let x = 0; x < response.length; x++){

			let searchResult = await image_search({ query: `Dislyte ${response[x].esper1.name}`, moderate: true });
			const leadEsperImage = searchResult[randomNumber(5)].image;

			searchResult = await image_search({ query: `Dislyte ${response[x].esper2.name}`, moderate: true });
			const secondEsperImage = searchResult[randomNumber(5)].image;

			searchResult = await image_search({ query: `Dislyte ${response[x].esper3.name}`, moderate: true });
			const thirdEsperImage = searchResult[randomNumber(5)].image;

			const embed = new EmbedBuilder()
							.setColor(0x0099FF)
							.setTitle('Holobattle Formation Recommendations')
							.addFields(
								{ name: response[x].esper1.name, value: response[x].esper1.details, inline: true },
								{ name: response[x].esper2.name, value: response[x].esper2.details, inline: true },
								{ name: response[x].esper3.name, value: response[x].esper3.details, inline: true },
							)
							.setURL('https://playdislyte.com/')
			const esper1 = new EmbedBuilder().setURL('https://playdislyte.com/').setImage(leadEsperImage)
			const esper2 = new EmbedBuilder().setURL('https://playdislyte.com/').setImage(secondEsperImage);
			const esper3 = new EmbedBuilder().setURL('https://playdislyte.com/').setImage(thirdEsperImage);
			if(x > 0) {
				await interaction.channel.send( {embeds: [embed, esper1, esper2, esper3]} );
			} else {
				await interaction.editReply( {embeds: [embed, esper1, esper2, esper3]} );
			}
		}
	},
};