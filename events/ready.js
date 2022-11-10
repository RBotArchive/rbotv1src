module.exports = {
	name: 'ready',
	async execute(client) {
		client.logger.info('Ready!');
	},
};
