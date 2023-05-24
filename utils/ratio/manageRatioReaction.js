module.exports = async function (client, data) {
    data.likes = reaction.count;

    await client.ratioDB.set(reaction.message.id, data);
};
