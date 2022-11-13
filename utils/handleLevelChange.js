roles = [
  { id: "1038028003982196737", level: 0 },
  { id: "1038028003982196738", level: 10 },
  { id: "1038028003982196739", level: 20 },
  { id: "1038028003982196740", level: 40 },
  { id: "1038028003982196741", level: 60 },
  { id: "1038028003982196742", level: 80 },
  { id: "1038028003982196743", level: 100 },
];

module.exports = async function (client, message, level) {
  for (i = 0; i < roles.length; i++) {
    if (roles[i].level === level) {
      message.member.roles.remove(roles[i - 1].id);
      message.member.roles.add(roles[i].id);
      return `\nTu es à présent ${
        client.guilds.cache
          .get("1038028003822805065")
          .roles.cache.get(roles[i].id).name
      } !`;
    }
  }
  return "";
};
