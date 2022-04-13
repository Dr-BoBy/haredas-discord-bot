const Discord = require("discord.js");
const config = require("./config.json");
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
    channel.setName("MEMBRES : "+channel.guild.memberCount);
    console.log("updated");
    const embed=new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("👋 Arrivées | Weatheria")               
        .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
        .addField("\u200B","Bienvenue <@"+member.id+"> sur le Discord de Weatheria !")
        .addField("\u200B","*N'oublie pas de lire et d'accepter le <#929429367849889852> pour accéder au serveur.*")
        .setImage(member.displayAvatarURL())
        .addField("\u200B","Nous sommes désormais **"+channel.guild.memberCount+"** sur le Discord !")
        .setTimestamp()
        .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
    Client.channels.cache.get("928059642381217874").send({embeds:[embed]});                     
});

//MEMBER QUIT
Client.on("guildMemberRemove", member =>{
    const channel=Client.channels.cache.get("929070955131727923");
    channel.setName("MEMBRES : "+channel.guild.memberCount);
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
                .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
            if (reaction.emoji.name == "🎮") {
                const channel_name = "Ticket jeu " + channel_nb;
                var chan=guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: "928126027467726918",
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            else if (reaction.emoji.name == "🎤") {
                const channel_name = "Ticket discord " + channel_nb;
                guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: "928126027467726918",
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            else if (reaction.emoji.name == "💰") {
                const channel_name = "Ticket boutique " + channel_nb;
                guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: "928126027467726918",
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            else if (reaction.emoji.name == "❓") {
                const channel_name = "Ticket autre " + channel_nb;
                guild.channels.create(channel_name,{type: 'text',parent: category,permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: "928126027467726918",
                        allow: [ "VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]
                    }, {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]}).then(chan => chan.send({embeds:[embed]})).then(async msg => {msg.react("🔒")})
            }
            msg.reactions.removeAll();
            msg.react("🎮")
            msg.react("🎤")
            msg.react("💰")
            msg.react("❓")
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
        //Ajout role joueur
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
        const guild = reaction.message.guild
        const member = guild.members.cache.find(member => member.id === user.id);
        if(reaction.message.channel.id==="929429367849889852"){
            if (reaction.emoji.name == "✅" && member.roles.cache.find(role => role.id ==="929032736310689873")) {
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
                    .setTitle("👥 Staff | Weatheria")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","**👑 » Gérants (3)**\n<@232439083790499840>\n<@336553465046237184>\n<@409092476209725440>")
                    .addField("\u200B","**🎲 » Équipe Weatheria (4)**\n<@274612275418103808>\n<@505864125142794280>\n<@378586379757682700>\n<@901515561337520158>")
                    .addField("\u200B","**❓ » Helpers (2)**\n<@327155033500286976>\n<@260331598002651136>")
                    .addField("\u200B","**👥 L'Équipe Weatheria**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
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
                    .setTitle("📜 Règlement Officiel | Weatheria")
                    .setDescription("\u200B\n⚠️ Voici le réglement de notre serveur. Merci de bien vouloir prendre connaissance de celui-ci avant de commencer à intéragir avec d'autres utilisateurs.")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","\u200B")
                    .addField("⛔ *Il est formellement interdit :*","- De tenir des propos insultants.\n- De tenir des propos à caractères homophobes, pornographiques, racistes.\n- De tenir des propos menaçants ou provocateurs.\n- D'utiliser un pseudonyme inapproprié.\n- D'utiliser une photo de profil inapproprié\n- D'utiliser une description ou un statut inapproprié\n- De spam/flood dans les différents salons écrits.\n- D'abuser des majuscules ou d'émojis\n- De faire de la publicité, et ce, peu importe sa forme\n- D'utiliser de manière excessive les soundboards dans les salons vocaux")
                    .addField("\u200B\n⚠️Toute infraction envers ces différentes règles, se traduira par une sanction justifiée.","\u200B\n**👥 L'Équipe Weatheria.**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
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
                    .setTitle("🔖 Créer Un Ticket | Weatheria")
                    .setDescription("Pour ouvrir un **nouveau ticket**, veuillez **réagir** à ce message en fonction de votre demande")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","- 🎮 \u00a0»\u00a0 En jeu\n- 🎤 \u00a0»\u00a0 Discord\n- 💰 \u00a0»\u00a0 Boutique\n- ❓ \u00a0»\u00a0 Autre")
                    .addField("\u200B","**👥 L'Équipe Weatheria**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
                message.channel.send({embeds:[embed]}).then(async msg => {
                    msg.react("🎮")
                    msg.react("🎤")
                    msg.react("💰")
                    msg.react("❓")
                })
            }
        }

        //MDJ
        else if(message.content===prefix+"mdj"){
            if(message.channel!="928129872025514035"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("🎲 Modes De Jeu / Mini-Jeux | Weatheria")
                    .setDescription("Retrouvez ici toutes nos créations")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","\u200B")
                    .addField("🏹 Nos UHC (1)","\u200B")
                    .addField("🏴 Wano UHC","https://weatheria-network.gitbook.io/weatheria/modes-de-jeux-uhc/wano-uhc-v1")
                    .addField("\u200B","\u200B")
                    .addField("🎲 Nos Mini-Jeux (1)","\u200B")
                    .addField("🛏️ VoidRush","https://weatheria-network.gitbook.io/weatheria/mini-jeux/void-rush")
                    .addField("\u200B","**👥 L'Équipe Weatheria**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
                message.channel.send({embeds:[embed]})
            }
        }

        //locmdj
        else if(message.content===prefix+"locmdj"){
            if(message.channel!="932769143759986748"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("🕹️ Louer Un Mode/Mini-Jeu | Weatheria")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","Vous souhaitez proposer un nouveau Mode De Jeu ou nouveau Mini-Jeu sur votre serveur, mais vous ne parvenez pas à trouver la motivation pour le créer ?")
                    .addField("\u200B","Notre équipe peut vous venir en aide ! 🕹️")
                    .addField("\u200B","**Alors, n’hésitez plus !**")
                    .addField("\u200B","Consultez <#928129872025514035> et si l’un de nos Modes De Jeu / Mini-Jeux vous intéresse pour votre serveur, <#928129948366041089> et détaillez votre demande de location pour une ou plusieurs de nos créations.")
                    .addField("\u200B","Un membre de notre équipe vous répondra dans les heures qui suivent.")
                    .addField("\u200B","*⚠️ (Notre équipe se réserve le droit de pouvoir refuser de louer un Mode De Jeu / Mini-Jeu à un client si son profil ne lui plaît pas)*")
                    .addField("\u200B","**👥 L’Équipe Weatheria.**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
                message.channel.send({embeds:[embed]})
            }
        }

        //cmdmdj
        else if(message.content===prefix+"cmdmdj"){
            if(message.channel!="932769371665858600"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("🎲 Commander Un Mode | Weatheria")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","Vous souhaitez créer votre propre mode de jeu sur Minecraft mais vous ne parvenez pas à développer vos idées pour mener à bien votre projet ?")
                    .addField("\u200B","Notre équipe de Game Designers peut s’en charger pour vous ! 🎲")
                    .addField("\u200B","**Alors, n’hésitez plus !**")
                    .addField("\u200B","Munissez-vous d’un document regroupant toutes les idées et références que vous aimeriez intégrer dans votre mode de jeu, et <#928129948366041089> en détaillant toute votre demande.")
                    .addField("\u200B","Un membre de notre équipe vous répondra dans les heures qui suivent.")
                    .addField("\u200B","**👥 L’Équipe Weatheria.**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
                message.channel.send({embeds:[embed]})
            }
        }

        //presentation
        else if(message.content===prefix+"presentation"){
            if(message.channel!="928127567960100874"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("👥 Présentation Officielle | Weatheria")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","**Qui sommes-nous ?**")
                    .addField("\u200B","**Weatheria** est une équipe de Game Designers souhaitant avant tout réaliser un maximum de projets pour venir en aide aux autres serveurs ou joueurs.")
                    .addField("\u200B","\u200B")
                    .addField("\u200B","**Que proposons nous ?**")
                    .addField("\u200B","Chez **Weatheria**, nous vous proposerons deux types de services :")
                    .addField("\u200B","*- La possibilité de louer nos Plugins Minecraft (Mini-Jeu / Mode De Jeu) pour votre serveur. 🕹️\n- La possibilité de commander le Game Design de votre propre Mode De Jeu / Mini-Jeu, à partir de vos idées. 🎲*")
                    .addField("\u200B","\u200B")
                    .addField("\u200B","**Mais ce n’est pas tout !**")
                    .addField("\u200B","Nous vous laissons également la possibilité de pouvoir jouer comme bon vous semble et en continu à **nos différents Mini-Jeux**.\nÉgalement, nous organiserons de temps à autres, des parties de **nos Modes De Jeu** afin de jouer avec vous. ")
                    .addField("\u200B","*⚠️ (Si vous ne souhaitez pas attendre davantage pour jouer à l’un de nos Modes De Jeu, vous pouvez acheter un ticket d’host utilisable pour organiser votre propre partie privée sur le Mode De Jeu de votre choix).*")
                    .addField("\u200B","**👥 L’Équipe Weatheria.**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
                message.channel.send({embeds:[embed]})
            }
        }
        
        //tutohost
        else if(message.content===prefix+"tutohost"){
            if(message.channel!="932769217294512219"){
                message.delete();
            }
            else{
                message.delete();
                const embed=new Discord.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("🕹️ Host Vos Parties | Weatheria")
                    .setDescription("Suivez ce tutoriel pour host vos parties sur le serveur Weatheria")
                    .setThumbnail("https://i.ibb.co/6rgTxw4/Icon-W-square-3000x3000.png")
                    .addField("\u200B","\u200B")
                    .addField("😅 Service indisponible","Vous ne pouvez pas encore host vos propre parties (On y travaille)")
                    .addField("\u200B","**👥 L'Équipe Weatheria**")
                    .addField("\u200B","\u200B")
                    .setFooter("Développé par Weatheria", "https://i.ibb.co/N9DwL49/Icon-W-circle-3000x3000.png");
                message.channel.send({embeds:[embed]})
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


Client.login(config.BOT_TOKEN)