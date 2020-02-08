const Discord = require('discord.js')
module.exports = {
    // Used to set the name of the mod. Note this is what will be shown on the dashboard.
    name: "Send Embed Message",
 
    // true if this is a mod for the dashboard and false if its a mod for the admin panel.
    dashboardMod: false,
 
    // You can put your name here and this will show up on the dashboard.
    author: "Zoom",
 
    // Here you define the version of the mod.
    version: "1.0.0",
 
    // You can set the mods description here and this will show up on the dashboard.
    short_description: "Sends a embed to the specified server and channel.",
 
    // If you want to add custom html to the mod set this to true. If not set this to false.
    customHtml: true,
 
    // Here you can add your custom html! Note if customHtml is set to false this will now show up. This is also valid bootstrap. Also note that this html code will be placed inside of <form> so if you want to retrieve the data all you need to do is add the fields.
    html: function () {
        return `
        <div class="form-group">
            <p>Find Server By:</p>
            <select class="form-control" name="serverType">
                <option selected value="id">Guild ID</option>
                <option value="name">Guild Name</option>
            </select><br>
            <p>Guild ID / Name:</p>
            <input class="form-control" name="server" rows="4" required><br><br>
 
            <p>Find Channel By:</p>
            <select class="form-control" name="channelType">
                <option selected value="id">Channel ID</option>
                <option value="name">Channel Name</option>
            </select><br>
            <p>Channel ID / Name:</p>
            <input class="form-control" name="channel" rows="4" required><br><br>
 
            <p>Title:</p>
            <input class="form-control" name="title" rows="4" required><br><br>
			<p>URL:</p>
            <input class="form-control" name="url" rows="4" placeholder="Leave blank for no URL"><br><br>
			<p>Author:</p>
            <textarea class="form-control" name="author" rows="4" style="width=100%" placeholder="Leave blank for no author"></textarea>
			<p>Author Picture:</p>
            <textarea class="form-control" name="authorpic" rows="4" style="width=100%" placeholder="Leave blank for no pciture"></textarea>
			<p>Embed Color:</p>
            <input class="form-control" name="color" rows="4" placeholder="Leave blank for no color"><br><br>
			<p>Use HEX when putting in color. Type "RANDOM" for a random color</p>

            <p>Description:</p>
            <textarea class="form-control" name="description" rows="4" style="width=100%"></textarea>
			<p>Footer:</p>
            <textarea class="form-control" name="footer" rows="4" style="width=100%" placeholder="Leave blank for no footer"></textarea>
			<p>Footer URL:</p>
            <textarea class="form-control" name="footerurl" rows="4" style="width=100%" placeholder="Leave blank for no footer URL"></textarea>
			

        </div>
        `
    },
 
    // This is used to move on to the next action. When the code is ran it will return to the dashboard but if you want to redirect you need to set this to false.
    next: true,
 
    // Whenever the command is executed this is the code that will be ran. You can use req to get stuff, note this only works if you add custom html.
    run: async (client, req) => {
        let server = undefined;
        let channel = undefined;
        if (req.body.serverType == 'id') server = client.guilds.find(server => server.id === req.body.server);
        if (!server) server = client.guilds.find(server => server.name === req.body.server);
        if (!server) return client.log = 'I couldn\'t find this server, please make sure you have the right ID or name.';
 
        if (req.body.channelType == 'id') channel = server.channels.find(channel => channel.id === req.body.channel);
        if (!channel) channel = client.guilds.find(channel => channel.name === req.body.channel);
        if (!channel) return client.log = 'I couldn\'t find this channel, please make sure you have the right ID or name.';
 
        const embed = new Discord.RichEmbed()
            	.setColor(req.body.color)
			.setTitle(req.body.title)
			.setURL(req.body.url)
			.setAuthor(req.body.author, req.body.authorpic)
			.setDescription(req.body.description)
			.setThumbnail(req.body.thumb)
			.setImage(req.body.image)
			.setFooter(req.body.footer, req.body.footerurl);

        channel.send(embed);
 
        client.log = `Successfully sent the embed to ${server.name}`;
 
    }
}