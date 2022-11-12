/*
* Original source: https://github.com/xixi52/discord-canvas/blob/15cea8f78c27178ff030db8d5c2c3b526dc337a2/src/greetings/Base.js
* Copyrighted to xixi52
*/

const Canvas = require("@napi-rs/canvas");

const _1pxBase64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC`

const formatVariable = (prefix, variable) => {
    const formattedVariable = variable.toLowerCase()
        .split("-").map((word) => word.charAt(0).toUpperCase() + word.substr(1, word.length).toLowerCase()).join("");
    return prefix + formattedVariable;
}

const applyText = (canvas, text, defaultFontSize, width, font) => {
    const ctx = canvas.getContext("2d");
    do {
        ctx.font = `${(defaultFontSize -= 1)}px ${font}`;
    } while (ctx.measureText(text).width > width);
    return ctx.font;
}

class Greeting {

    /**
     * The base greetings class from discord-canvas
     */
    constructor() {
        this.username = "Clyde";
        this.guildName = "ServerName";
        this.colorTitleBorder = "#2b2f35";
        this.colorMemberCount = "#ffffff";
        this.textMemberCount = "- {count}ème membre !";
        this.memberCount = 0;
        this.backgroundImage = _1pxBase64;
        this.avatar = null;
        this.opacityBorder = 1;
        this.colorBorder = "#23272a";
        this.colorUsername = "#ffffff";
        this.colorUsernameBox = "#23272a";
        this.opacityUsernameBox = 1;
        this.discriminator = "XXXX";
        this.colorDiscriminator = "#ffffff";
        this.opacityDiscriminatorBox = 1;
        this.colorDiscriminatorBox = "#23272a";
        this.colorMessage = "#ffffff";
        this.colorHashtag = "#ffffff";
        this.colorBackground = "#2b2f35";
    }

    /**
     * Set avatar
     * @param {string|Buffer} value The avatar
     * @returns {Greeting}
     */
    setAvatar(value) {
        this.avatar = value;
        return this;
    }

    /**
     * Sets discriminator
     * @param {string} value the discriminator
     * @returns {Greeting}
     */
    setDiscriminator(value) {
        this.discriminator = value;
        return this;
    }

    /**
     * Set username
     * @param {string} value The username
     * @returns {Greeting}
     */
    setUsername(value) {
        this.username = value;
        return this;
    }

    /**
     * Set guild name
     * @param {string} value The guild name
     * @returns {Greeting}
     */
    setGuildName(value) {
        this.guildName = value;
        return this;
    }

    /**
     * Sets member count
     * @param {number} value The member count
     * @returns {Greeting}
     */
    setMemberCount(value) {
        this.memberCount = value;
        return this;
    }

    /**
     * Set background image
     * @param {string|Buffer} value The background image
     * @returns {Greeting}
     */
    setBackground(value) {
        this.backgroundImage = value;
        return this;
    }

    /**
     * Sets color
     * @param {string} variable The variable to set the color at
     * @param {string} value The color
     * @returns {Greeting}
     */
    setColor(variable, value) {
        const formattedVariable = formatVariable("color", variable);
        if (this[formattedVariable]) this[formattedVariable] = value;
        return this;
    }

    /**
     * Sets text
     * @param {string} variable The variable to set the text at
     * @param {string} value The text
     * @returns {Greeting}
     */
    setText(variable, value) {
        const formattedVariable = formatVariable("text", variable);
        if (this[formattedVariable]) this[formattedVariable] = value;
        return this;
    }

    /**
     * Sets opacity
     * @param {string} variable Sets the opacity of the given variable
     * @param {number} value The opacity to set
     * @returns {Greeting}
     */
    setOpacity(variable, value) {
        const formattedVariable = formatVariable("opacity", variable);
        if (this[formattedVariable]) this[formattedVariable] = value;
        return this;
    }

    /**
     * Builds the image
     * @returns {Promise<Canvas.Canvas>}
     */
    async toAttachment() {
        if (!this.avatar) throw new Error("avatar is required");
        // Create canvas
        const canvas = Canvas.createCanvas(1024, 450);
        const ctx = canvas.getContext("2d");

        const guildName = this.textMessage.replace(/{server}/g, this.guildName);
        const memberCount = this.textMemberCount.replace(/{count}/g, this.memberCount);

        // Draw background
        ctx.fillStyle = this.colorBackground;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let background = await Canvas.loadImage(this.backgroundImage);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Draw layer
        ctx.fillStyle = this.colorBorder;
        ctx.globalAlpha = this.opacityBorder;
        ctx.fillRect(0, 0, 25, canvas.height);
        ctx.fillRect(canvas.width - 25, 0, 25, canvas.height);
        ctx.fillRect(25, 0, canvas.width - 50, 25);
        ctx.fillRect(25, canvas.height - 25, canvas.width - 50, 25);
        ctx.fillStyle = this.colorUsernameBox;
        ctx.globalAlpha = this.opacityUsernameBox;
        ctx.fillRect(344, canvas.height - 296, 625, 65);
        ctx.fillStyle = this.colorDiscriminatorBox;
        ctx.globalAlpha = this.opacityDiscriminatorBox;
        ctx.fillRect(389, canvas.height - 225, 138, 65);
        ctx.fillStyle = this.colorMessageBox || "#23272a";
        ctx.globalAlpha = typeof this.opacityMessageBox !== "number" ? 1 : this.opacityMessageBox;
        ctx.fillRect(308, canvas.height - 110, 672, 65);

        // Draw username
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.colorUsername;
        ctx.font = applyText(canvas, this.username, 48, 600, "MANROPE_BOLD");
        ctx.fillText(this.username, canvas.width - 660, canvas.height - 248);

        // Draw guild name
        ctx.fillStyle = this.colorMessage;
        ctx.font = applyText(canvas, guildName, 53, 600, "MANROPE_BOLD");
        ctx.fillText(guildName, canvas.width - 690, canvas.height - 62);

        // Draw discriminator
        ctx.fillStyle = this.colorDiscriminator;
        ctx.font = "40px MANROPE_BOLD";
        ctx.fillText(this.discriminator, canvas.width - 623, canvas.height - 178);

        // Draw membercount
        ctx.fillStyle = this.colorMemberCount;
        ctx.font = "22px MANROPE_BOLD";
        ctx.fillText(memberCount, 40, canvas.height - 35);

        // Draw # for discriminator
        ctx.fillStyle = this.colorHashtag;
        ctx.font = "55px MANROPE_BOLD,NOTO_COLOR_EMOJI";
        ctx.fillText("#", canvas.width - 690, canvas.height - 168);

        // Draw title
        ctx.font = "90px MANROPE_BOLD";
        ctx.strokeStyle = this.colorTitleBorder;
        ctx.lineWidth = 15;
        ctx.strokeText(this.textTitle, canvas.width - 620, canvas.height - 330);
        ctx.fillStyle = "ffffff";
        ctx.fillText(this.textTitle, canvas.width - 620, canvas.height - 330);

        // Draw avatar circle
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#23272A";
        ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(this.avatar);
        ctx.drawImage(avatar, 45, 90, 270, 270);

        return canvas;
    }

    /**
     * Builds the image
     * @returns {Promise<Buffer>}
     */
    async build() {
        return (await this.toAttachment()).encode("png");
    }
};

module.exports = Greeting;