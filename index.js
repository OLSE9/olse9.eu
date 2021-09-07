function generate(){
    let pismena = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let dlzka = document.getElementById("dlzkaInput").value;
    let prve = document.getElementById("prveInput").value;
    let posledne = document.getElementById("posledneInput").value;
    let slovo = "";
    let dalsie = document.getElementById("dalsieInput").value;
    let specifikovanePismena = [];
    if(dalsie != ""){
        for(let pismenko of dalsie.split(",")){
            try{
                let cislo = pismenko.split(" - "[0]);
                let pismeno = pismenko.split(" - ")[1];
                if(!cislo || !pismeno) return alert("Zlý formát - ďalšie písmená");
                specifikovanePismena[parseInt(cislo)] = pismeno;
            } catch {
                return alert("Zlý formát - ďalšie písmená");
            }

        }
    }
    if(dlzka > 25) return alert("Maximálna dĺžka je 25");
    if((!pismena.includes(prve) && prve != "") || (!pismena.includes(posledne) && posledne != "")) return alert("Invalid písmeno!");
    if(prve != "") specifikovanePismena[1] = prve;
    if(posledne != "") specifikovanePismena[dlzka] = posledne
    for(let i = 0; i < dlzka; i++){
        if(specifikovanePismena[i + 1]){
            slovo += specifikovanePismena[i + 1]
        } else{
            slovo += pismena[Math.floor(Math.random() * pismena.length)]
        }
    }

    document.getElementById("vygenerovane").innerHTML = slovo;
}

class Command {
    constructor(usage, description, requiredPermissions){
        this.usage = usage;
        this.description = description;
        this.requiredPermissions = requiredPermissions;
    }
}

function appendCommands(tableID, commandsList, tableNewClass){
    var tableRef = document.getElementById(tableID).getElementsByTagName('tbody')[0];      
        var i;
        for(i = 0; i < commandsList.length; i++){
            var newRow = tableRef.insertRow();
            newRow.className = tableNewClass;
            var newUsageCell = newRow.insertCell(0);
            var newDescriptionCell = newRow.insertCell(1);
            var newPermissionsCell = newRow.insertCell(2);
            var newUsageText = document.createTextNode(commandsList[i].usage)
            var newDescriptionText = document.createTextNode(commandsList[i].description)
            newDescriptionCell.className = "descriptionField";
            var newPermissionsText = document.createTextNode(commandsList[i].requiredPermissions);
            newUsageCell.appendChild(newUsageText)
            newDescriptionCell.appendChild(newDescriptionText)
            newPermissionsCell.appendChild(newPermissionsText)
        }
}

function changeTableContent(category, commandsList, tableNewClass){
    var tableRef = document.getElementById("mainTable");
    var tableBodyRef = tableRef.getElementsByTagName('tbody')[0];
    var titleRef = document.getElementById('commandsTitle');
    tableBodyRef.innerHTML = '';
    var categoryColor;
    switch(category){
        case "economy":
            categoryColor = "orange";
            titleRef.innerHTML = "Economy commands";
            tableNewClass = "economyRow"
            break;
        case "moderation":
            categoryColor = "deepskyblue";
            titleRef.innerHTML = "Moderation commands";
            tableNewClass = "moderationRow"
            break;
        case "fun":
            categoryColor = "greenyellow";
            titleRef.innerHTML = "Fun commands";
            tableNewClass = "funRow"
            break;
        case "other":
            categoryColor = "grey";
            titleRef.innerHTML = "Other commands";
            tableNewClass = "otherRow"
            break;
    }
    tableRef.style.backgroundColor = categoryColor;
    appendCommands("mainTable", commandsList, tableNewClass);
    
}

                    
const moderationCommands = [new Command("ban <user> [reason]", "bans user  ", "ban_members"), new Command("unban <username + usertag>", "unbans user   ", "ban_members"),
new Command("softban <user> [reason]", "bans and instantly unbans someone", "ban_members"),
new Command("kick <user> [reason]", "kicks user", "kick_members"), new Command("mute <user> [reason]", "mutes user", "administrator"), new Command("unmute <user>", "unmutes user", "administrator"),
new Command("tempmute <user> <time> [reason]", "mutes user for specific time", "administrator"), new Command("clear <amount>", "deletes specific amount of messages", "delete_messages"),
new Command("warn <user> [reason]", "gives user a warning", "administrator"), new Command("warnings [user]", "view user's warnings", "own warnings -> None, other people warnings -> administrator"),
new Command("rr <text channel>", "creates reaction roles messages", "administrator"), new Command("slowmode <time>", "change slowmode in channel", "manage_channels"),
new Command("user [user]", "shows info about user", "administrator"), new Command("server", "shows info about server", "administrator")];

const economyCommands = [new Command("create", "create your OLSEBOT account", "-----"), new Command("actualize", "actualize your OLSEBOT account after changing name", "-----"),
new Command("delete_account", "delete your OLSEBOT account", "-----"), new Command("money [user]", "shows you user's amount of money", "-----"), 
new Command("daily", "claim daily reward", "-----"), new Command("hourly", "claim hourly reward", "-----"), new Command("give <user> <money>", "give your money to another user with OLSEBOT account", "-----"),
new Command("leaderboard", "shows money leaderboard", "-----"), new Command("stats", "shows OLSEBOT economy stats", "-----"), new Command("shop", "shows OLSEBOT shop with items", "-----"),
new Command("buy <first word of item name> [amount=1]", "buy something from OLSEBOT shop", "-----"), new Command("inventory", "view which items you have", "-----"),
new Command("beg", "beg for money", "-----"), new Command("sell", "sell items from your inventory", "-----"), new Command("coin <money> <bet>", "bet money on heads or tails", "-----"),
new Command("rob <user>", "steal OLSEBOT money from someone", "-----"), new Command("deposit <amount>", "deposit OLSEBOT money to bank", "-----"), new Command("withdraw", "withdraw OLSEBOT money from bank", "-----"),
new Command("chest [action=amount]", "view or open your chests", "-----"), new Command("record", "record videos with computer(and maybe earn OLSEBOT money)", "-----"), new Command("fish", "catch fish with fishing pole", "-----"),
new Command("peaceful <state>", "Enable or disable peaceful mode", "-----")];

const funCommands = [new Command("rng <min_num> <max_num>", "Generates random number between two numbers", "-----"), new Command("reverse <text>", "command to reverse text", "-----"),
new Command("poem <text>", "randomly mess up text that you choose", "-----"), new Command("8ball <question>", "ask magic ball yes/no question", "-----"),
new Command("love <object/person> <object/perso>", "insert 2 people/objects and bot will give you percentage of their love", "-----"),
new Command("rps <move>", "play rock-paper-scissors with bot", "-----"), new Command("someone <amount>", "mention random person/people", "-----")];

const otherCommands = [new Command("help [command]", "shows help with bot commands/command", "-----"), new Command("count <number> <operator> <number>", "solve basic mathematical equations", "-----"),
new Command("botinfo", "shows information about bot", "-----"), new Command("deleted", "view last message that was deleted in your guild", "-----"),
new Command("prefix <prefix>", "change server bot prefix", "administrator"), new Command("poll <poll>", "creates a poll", "administrator"),
new Command("multipoll <amount> <poll>", "creates a poll with more options", "administrator"), new Command("ping", "view bot's latency", "-----"),
new Command("leave", "bot leaves the server", "server owner"), new Command("send <user> <message>", "sends a message to user", "-----"), new Command("say <message>", "bot says your message", "administrator"),           
new Command("todo", "view thing that I want to add to OLSEBOT", "-----"), new Command("reactions <state>", "enable or disable reactions to unprefixe messages(for guild)", "administrator"),
new Command("userreactions <state>", "enable or disable reactions to unprefixe messages(for user)", "-----"), new Command("suggestions <channel>", "setup your server suggestions", "administrator"),
new Command("suggest <suggestion>", "suggest something if server had set up server suggestions", "-----"), new Command("report <content>", "report something to me about bot(bugs for example)", "-----")];
