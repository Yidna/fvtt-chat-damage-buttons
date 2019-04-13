class ChatDamageButtons5e extends Application {
    constructor(app) {
        super(app);
        console.log(" *** loaded Chat Damage Buttons 5e constructor ***");
    }

    init () {

        console.log(" *** initialised Chat Damage Buttons 5e module ***");

        Hooks.on('renderChatMessage', (message, data, html) => {
            if ( !message.isRoll || message.roll.parts[0].faces == 20 ) return;

            const fullDamageButton = $('<button class="dice-total-fullDamage-btn" style="max-width: 10%;"><i class="fas fa-user-minus" title="Click to apply full damage to selected token(s)."></i></button>');
            const halfDamageButton = $('<button class="dice-total-halfDamage-btn" style="max-width: 10%;"><i class="fas fa-user-shield" title="Click to apply half damage to selected token(s)."></i></button>');
            const doubleDamageButton = $('<button class="dice-total-doubleDamage-btn" style="max-width: 10%;"><i class="fas fa-user-injured" title="Click to apply double damage to selected token(s)."></i></button>');
            const fullHealingButton = $('<button class="dice-total-fullHealing-btn" style="max-width: 10%;"><i class="fas fa-user-plus" title="Click to apply full healing to selected token(s)."></i></button>');

            if (game.user.isGM) {
                html.find('.dice-total').append(fullDamageButton);
                html.find('.dice-total').append(halfDamageButton);
                html.find('.dice-total').append(doubleDamageButton);
                html.find('.dice-total').append(fullHealingButton);

                // Handle button clicks
                fullDamageButton.click(ev => {
                    ev.preventDefault();
                    Actor5e.applyDamage(html, 1);
                });
                
                halfDamageButton.click(ev => {
                    ev.preventDefault();
                    Actor5e.applyDamage(html, 0.5);
                });

                doubleDamageButton.click(ev => {
                    ev.preventDefault();
                    Actor5e.applyDamage(html, 2);
                });

                fullHealingButton.click(ev => {
                    ev.preventDefault();
                    Actor5e.applyDamage(html, -1);
                });
            }

            //note to self: make damage chat messages red to distinguish them. 
            //look to make attack hits and misses different colours with Crits and Fumbles bold versions of them. 
            //add damage and half damage buttons and link up the events hook.

        })
    }
}

let chatButtons = new ChatDamageButtons5e();
chatButtons.init();