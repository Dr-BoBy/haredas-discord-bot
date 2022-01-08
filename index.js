const Discord = require("discord.js");
const Client = new Discord.Client({
    partials: ['USER', 'REACTION', 'MESSAGE'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});

const prefix = "!";

//LANCEMENT
Client.on("ready",()=>{
    console.log("bot opérationnel");
    Client.user.setActivity("Hep, Hep, Hep !",{type: "PLAYING"})
});

//NEW MEMBER
Client.on("guildMemberAdd", member =>{
    const channel=Client.channels.cache.get("929070955131727923");
    channel.setName("| - - "+channel.guild.memberCount+" WEATHERIEN - - |");
    console.log("updated");
    const embed=new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Bienvenue sur Weatheria")               
        .setDescription("Accepte le réglement pour accéder au serveur")
        .setThumbnail(member.displayAvatarURL())
        .addField("\u200B","\u200B")
        .addField(member.displayName+" vient de rejoindre le serveur","Nous lui souhaitons tous bon jeu !")
        .addField("\u200B","\u200B")
        .addField("Nous sommes "+channel.guild.memberCount+" membres","Merci à vous tous")
        .setTimestamp()
        .setFooter("Développé par Weatheria", "https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr");
    Client.channels.cache.get("928059642381217874").send({embeds:[embed]});                     
});

//MEMBER QUIT
Client.on("guildMemberRemove", member =>{
    const channel=Client.channels.cache.get("929070955131727923");
    channel.setName("| - - "+channel.guild.memberCount+" WEATHERIEN - - |");
    console.log("updated");
});

//REACTION ADD
Client.on('messageReactionAdd', async (reaction, user) => {
    if (!user.bot) {
        const msg = reaction.message;
        const { guild } = reaction.message
        const member = guild.members.cache.find(member => member.id === user.id);
        const category = Client.channels.cache.get(reaction.message.channel.parentId);
        if(reaction.message.channel.id==="928129948366041089"){
            const channel_nb=Math.round(Math.random()*9999);
            const embed=new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Ouverture de ticket")
                .addField("L'équipe Weatheria vous répondra bientot","Pour fermer le ticket, utilisez la réaction 🔒")
                .setFooter("Développé par Weatheria", "https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr");
            if (reaction.emoji.name == "👷‍♂️") {
                const channel_name = "Ticket aide " + channel_nb;
                var chan=guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            else if (reaction.emoji.name == "🔧") {
                const channel_name = "Ticket bug " + channel_nb;
                guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            else if (reaction.emoji.name == "💡") {
                const channel_name = "Ticket suggestion " + channel_nb;
                guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            else if (reaction.emoji.name == "🛍️") {
                const channel_name = "Ticket commande " + channel_nb;
                guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            msg.reactions.removeAll();
            msg.react("👷‍♂️")
            msg.react("🔧")
            msg.react("💡")
            msg.react("🛍️")
        }
        if(msg.channel.parent.id==="928129342918246461"){
            if(reaction.emoji.name == "🔒"){
                const member = guild.members.cache.find(member => member.id === "928588995976364033");
                if(member.id==="928588995976364033"){
                    let Channel=msg.channel.name.split("-");
                    if (Channel[0]=="ticket"){
                        msg.channel.delete();
                    }
                }   
            }
        }
        if(reaction.message.channel.id==="929429367849889852"){
            if (reaction.emoji.name == "✅") {
                member.roles.add("929032736310689873");
            }  
        }
    }
});

//REACTION REMOVE
Client.on('messageReactionRemove', async (reaction, user) => {
    if (!user.bot) {
        const msg = reaction.message;
        const { guild } = reaction.message
        const member = guild.members.cache.find(member => member.id === user.id);
        if(reaction.message.channel.id==="929429367849889852"){
            if (reaction.emoji.name == "✅") {
                member.roles.remove("929032736310689873");
            }  
        }
    }
});
//MESSAGE
Client.on("messageCreate", message =>{
    if(message.author.bot) return;
    if(message.member.roles.cache.has("928125297486880810") || message.member.roles.cache.has("928126027467726918")){
        split=message.content.split(" ");
        var cmd=[];
        for (var i = 0; i < split.length; i++) {
            cmd.push(split[i]);
        }
        //staff
        if(message.content===prefix+"staff"){
            if(message.channel!="928063685887426611"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Le staff de Weatheria")
                    .setDescription("Retrouvez ici tous les membres du staff")
                    .setThumbnail("https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr")
                    .addField("\u200B","\u200B")
                    .addField("👑 » Gerant (3)","<@232439083790499840>, <@336553465046237184>, <@409092476209725440>",true)
                    .addField("🎲 » Game Designer (6)","<@535873852417376262>, <@274612275418103808> , <@505864125142794280> , <@378586379757682700> , <@901515561337520158> , <@611703310017363979>",true)
                    .addField("❓ » Helper (2)","<@327155033500286976>, <@260331598002651136>",true)
                    .setFooter("Développé par Weatheria", "https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr");
                message.channel.send({embeds:[embed]})
            }
        }
        
        //règle
        if(message.content===prefix+"règle"){
            if(message.channel!="929429367849889852"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Règlement de Weatheria")
                    .setDescription("Merci de respecter le règlement sous peine de recevoir une sanction")
                    .setThumbnail("https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr");
                message.channel.send({embeds:[embed]}).then(async msg => {
                    msg.react("✅")
                })
            }
        }

        //ticket
        else if(message.content===prefix+"ticket"){
            if(message.channel!="928129948366041089"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Ouverture de ticket")
                    .setDescription("Réagissez avec les émojis pour ouvrir un ticket")
                    .setThumbnail("https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr")
                    .addField("\u200B","\u200B")
                    .addField("👷‍♂️","Ouvre un ticket de report d'aide",true)
                    .addField("\u200B","\u200B",true)
                    .addField("🔧","Ouvre un ticket de report de bug",true)
                    .addField("💡","Ouvre un ticket de suggestion",true)
                    .addField("\u200B","\u200B",true)
                    .addField("🛍️","Ouvre un ticket de commande",true)
                    .setFooter("Développé par Weatheria", "https://static.wikia.nocookie.net/onepiece/images/5/5a/Weatheria_Anime_Infobox.png/revision/latest/scale-to-width-down/350?cb=20181109155852&path-prefix=fr");
                message.channel.send({embeds:[embed]}).then(async msg => {
                    msg.react("👷‍♂️")
                    msg.react("🔧")
                    msg.react("💡")
                    msg.react("🛍️")
                })
            }
        }

        //fermeture Ticket
        else if(message.content===prefix+"tclose"){
            let Channel=message.channel.name.split("-");
            if (Channel[0]=="ticket"){
                message.channel.delete();
            }
            else{
                message.delete();
            }
        }
        

        //clear
        else if(cmd[0]===prefix+"clear"){
            if(isNaN(cmd[1]) || cmd.length!=2){
                message.delete();
            }
            else{
                message.channel.bulkDelete((cmd[1]), true)
            }
        }
    }
});


Client.login(process.env.TOKEN)