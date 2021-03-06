import { randomElement, randomIn } from "../../../../../utils/random";
import { Enemy, EnemyInitializer, HitType } from "./enemy";

/**
 * Generates a random enemy.
 */
export function generateEnemy() {

    const criesOfDespair = [
        "ow",
        "that hurt",
        "please just leave me alone",
        "You won't defeat me!",
        "You're too weak!",
        "That hurt!",
        "Ouch",
        "I will defeat you.",
    ];

    const deathMessages = [
        "I've been slain!",
        "I'm defeated",
        "Everything is going dark...",
        "Goodbye, cruel world.",
        ":(",
    ];

    const winMessages = [
        "You'd better run!",
        "I won!",
        "Coward!",
        "Haha",
    ];

    const enemies: (() => EnemyInitializer)[] = [
        () => ({
            name: "Angry Duck",
            criesOfDespair: [
                "quack!",
                "QUACK!",
                "quack",
                "qua",
            ],
            chanceOfCrying: 0.9,
            deathMessages: ["quaaaaa!"],
            winMessages: [
                "Quack quack quack!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** pecked **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** bit **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** demolished **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(20, 60),
            defence: randomIn(60, 120),
            maxHealth: randomIn(100, 400),
        }),
        () => ({
            name: "Deck Boss",
            criesOfDespair: [
                "You won't defeat me!",
                "I'm the boss!",
                "Ha ha ha ha!",
                "That tickled!",
                "weak",
                "Try again, punk.",
            ],
            deathMessages: [
                "Unbelievable!",
                "You? Defeat me!? Impossible!",
                "Noooo!",
            ],
            winMessages: [
                "Ha. Weakling.",
                "That's what I thought.",
                "Can't deck the deck boss.",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** grazed **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** whacked **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** stomped **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(50, 200),
            defence: randomIn(10, 30),
            maxHealth: randomIn(1000, 2000),
        }),
        () => ({
            name: "Home Depot Employee",
            criesOfDespair: [
                ...criesOfDespair,
                "Can I help you?",
            ],
            deathMessages: [
                "Do you need anything else?",
                "Thank you for visiting Home Depot",
            ],
            winMessages: [
                "Have a good day!",
                "Please come again!",
                "Thank you for visiting Home Depot",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** offered to help **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** gave **${target}** their change. It did ${damage} hp damage.`,
                critical: `**${name}** gave woodworking advice to **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(20, 40),
            defence: randomIn(20, 80),
            maxHealth: randomIn(200, 500),
        }),
        () => ({
            name: "Dad",
            criesOfDespair: [
                "Hi hungry, I'm dad.",
                "I'll *deck* you!",
                "A spoon, a fork, and a knife walk into a restaurant.",
                "A man walks into a bar, and says 'ow'.",
                "Too slow!",
                "Don't touch that thermostat!",
                "Boy do I love decks!",
                "Why did the old man fall in the well? Because he couldn’t see that well!",
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "Are you a scarecrow? Because you're outstanding!",
            ],
            chanceOfCrying: 0.7,
            deathMessages: [
                "Call me an ambulance! I'm an ambulance!",
                "Hi dead, I'm me?",
                "Did you hear about the Italian chef who died? He pasta way!",
                "What rhymes with boo and stinks? You!",
            ],
            winMessages: [
                "See ya later, alligator",
                "Farewell, my child",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** pretended to hit **${target}**.`,
                weak: `**${name}** tickled **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** mocked **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** sneezed at **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(10, 20),
            defence: randomIn(200, 400),
            maxHealth: randomIn(100, 800),
        }),
        () => ({
            name: "The Builder of Decks",
            criesOfDespair,
            deathMessages,
            winMessages,
            maxHealth: randomIn(400, 600),
        }),
        () => ({
            name: "Anthropomorphic Hammer",
            criesOfDespair: [
                "wham!",
                "bam!",
                "bang!",
            ],
            deathMessages: [""],
            winMessages: [""],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** grazed **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** hit **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** hammered **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(100, 200),
            defence: randomIn(30, 50),
            maxHealth: randomIn(100, 300),
        }),
        () => ({
            name: "The Griller",
            criesOfDespair: [
                "You're on fire!",
                "I'm fired up!",
                "Medium rare!",
                "I'm out of propane!",
            ],
            deathMessages: [
                "I've been grilled.",
                "I've gone up in flames.",
                "please... take care of my... burgers... they need to be flipped",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** toasted **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** grilled **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** set **${target}** on fire. It did ${damage} hp damage.`,
            }[hitType]),
            winMessages: [
                "",
            ],
            strength: randomIn(50, 150),
            defence: randomIn(20, 40),
            maxHealth: randomIn(300, 400),
        }),
        () => ({
            name: "Deck Slug",
            criesOfDespair: ["gloop", "glump", "glorp", "glurgle", "gludge"],
            chanceOfCrying: 0.8,
            deathMessages: ["gloop", "glump", "glorp", "glurgle", "gludge"],
            winMessages: [
                "glimp glomp",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** glabbed at **${target}**.`,
                weak: `**${name}** glimped **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** glooped **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** glomped **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(10, 20),
            defence: randomIn(20, 40),
            maxHealth: randomIn(10, 400),
        }),
        () => ({
            name: "Bird",
            criesOfDespair: ["chirp", "squawk", "beep", "cheep", "caw"],
            chanceOfCrying: 0.8,
            deathMessages: ["chirp", "squawk", "beep", "cheep", "caw"],
            winMessages: [
                "caw caw!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** pecked **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** scratched **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** dropped **${target}** from the sky. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(10, 20),
            defence: randomIn(200, 400),
            maxHealth: randomIn(100, 400),
        }),
        () => ({
            name: "Keeper of the decks",
            criesOfDespair,
            deathMessages,
            winMessages,
            strength: randomIn(50, 150),
            defence: randomIn(50, 150),
            maxHealth: randomIn(500, 1500),
        }),
        () => ({
            name: "Deck Skeleton",
            criesOfDespair: [
                "spooky scary skeleton",
                "doot",
                "DOOT",
                "doot doot doot",
                "this really rattles my bones",
                "You're being drafted into the skeleton army",
                "Got milk?",
            ],
            deathMessages: [
                "I was already dead, not sure why you've done this",
                "Back to the grave I guess",
            ],
            winMessages: [
                "Get spooked.",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** poured milk on **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** dooted **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** recruited **${target}** to the skeleton army. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(50, 150),
            defence: randomIn(40, 80),
            maxHealth: randomIn(100, 1000),
        }),
        () => ({
            name: "Mysterious Deck Child",
            criesOfDespair: [
                "Hello",
                "hi",
                "I love you",
                "Hi mom",
                "I found a doll",
                "tee he he",
            ],
            deathMessages: [
                "I'll be back!",
                "I'll be with you in your dreams!",
                "I still love you!",
            ],
            winMessages: [
                "Please don't leave me.",
                "Alone again.",
                "I'll find you.",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** winked. It did ${damage} hp damage.`,
                normal: `**${name}** smiled. It did ${damage} hp damage.`,
                critical: `**${name}** cried. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(20, 40),
            defence: randomIn(100, 300),
            maxHealth: randomIn(100, 600),
        }),
        () => ({
            name: "Slimeboy",
            criesOfDespair: [
                "I ain't afraid of no leg-hand!",
                "My parents are leg-hand enthusiasts!",
                "Blimey!",
                "Does he even have health insurance!?",
                "Entranceway!",
            ],
            deathMessages: [
                "Crikey!",
                "What fun!",
            ],
            winMessages: [
                "The slime represents the state of the healthcare system in the United States.",
                "Oh heck, I won.",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** made a smug remark.`,
                weak: `**${name}** taunted **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** oozed on **${target}**. It did ${damage} hp damage.`,
                critical: `**Oh heck. ${name}** just leg-hand slapped **${target}**. It did ${damage} hp damage. Crikey!`,
            }[hitType]),
            strength: randomIn(40, 80),
            defence: randomIn(100, 300),
            maxHealth: randomIn(100, 600),
        }),
        () => ({
            name: "Death",
            criesOfDespair: [
                "You cannot kill that which has no life!",
                "I'm am death, destroyer of worlds!",
                "Death comes to all!",
                "dèa̧th c̨o͢m̡e͘s",
                "d͜e̛a̸th co͠mès",
                "I am inevitable",
            ],
            chanceOfCrying: 0.1,
            deathMessages: [
                "I guess I'll go back home, then.",
                "I'll get you one day.",
            ],
            winMessages: [
                "Foolish mortal!",
                "I'll get you eventually. I get everyone eventually.",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** laughed at **${target}**.`,
                weak: `**${name}** knocked. It did ${damage} hp damage.`,
                normal: `**${name}** hit **${target}** with his scythe. It did ${damage} hp damage.`,
                critical: `**${name}** let time pass, and **${target}** got older. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(50, 100),
            defence: randomIn(50, 200),
            maxHealth: randomIn(1000, 3000),
        }),
        () => ({
            name: "God Himself",
            criesOfDespair: [
                "Let there be light!",
                "I'll smite you.",
                "Do you want a plague?",
                "I'll turn you to salt!",
                "Build me an ark.",
            ],
            chanceOfCrying: 0.1,
            deathMessages: [""],
            chanceOfDeathMessage: 0.0,
            winMessages: [
                "Foolish mortal!",
                "Don't look back!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** spoke to **${target}**.`,
                weak: `**${name}** disapproved **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** judged **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** smote **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(50, 200),
            defence: randomIn(50, 100),
            maxHealth: randomIn(2000, 6000),
        }),
        () => ({
            name: "A Swarm of Bees",
            criesOfDespair: [
                "bzzzzzzz",
                "bzzzzzzzzzzz",
                "bzzzzz",
                "buzz buzz",
                "buzz buzz buzz",
                "buzz",
                "buzz buzz buzz buzz buzz",
                "pew pew pew",
                "According to all known laws of aviation, there is no way a bee should be able to fly",
                "Hey, honey",
            ],
            chanceOfCrying: 0.7,
            deathMessages: [
                "bzzzzzzz",
            ],
            winMessages: [
                "Bees are dying at an alarming rate, but you can help",
                "buzz buzz!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** buzzed at **${target}**.`,
                weak: `**${name}** buzzed at **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** stung **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** consumed **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(30, 50),
            defence: randomIn(30, 100),
            maxHealth: randomIn(500, 700),
        }),
        () => ({
            name: "Deck Builder",
            criesOfDespair,
            deathMessages,
            winMessages,
            strength: randomIn(30, 90),
            defence: randomIn(30, 90),
            maxHealth: randomIn(500, 600),
        }),
        () => ({
            name: "Deck Layer",
            criesOfDespair,
            deathMessages,
            winMessages,
            strength: randomIn(30, 90),
            defence: randomIn(30, 90),
            maxHealth: randomIn(600, 800),
        }),
        () => ({
            name: "The Carpenter",
            criesOfDespair,
            deathMessages,
            winMessages,
            strength: randomIn(30, 90),
            defence: randomIn(30, 90),
            maxHealth: randomIn(200, 400),
        }),
        () => ({
            name: "The Decker",
            criesOfDespair,
            deathMessages,
            winMessages,
            strength: randomIn(30, 90),
            defence: randomIn(30, 90),
            maxHealth: randomIn(400, 800),
        }),
        () => ({
            name: "Deck",
            criesOfDespair,
            deathMessages,
            winMessages,
            strength: randomIn(30, 90),
            defence: randomIn(30, 90),
            maxHealth: randomIn(300, 900),
        }),
        () => ({
            name: "The Man",
            criesOfDespair,
            deathMessages,
            winMessages,
            strength: randomIn(30, 90),
            defence: randomIn(30, 90),
            maxHealth: randomIn(200, 800),
        }),
        () => ({
            name: "Kyle",
            criesOfDespair: [
                "I'll punch a hole in your drywall!",
                "Get me my monster!",
                "Where's my monster?",
                "Have you seen my pickup truck?",
                "Bruh",
                "Bro",
            ],
            deathMessages: [
                "Where's my monster?",
                "You've defeated this monster!",
                "I'm straight up not having a good time.",
                "bruh",
            ],
            winMessages: [
                "Come back and square up, bruh!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** drank some monster.`,
                weak: `**${name}** shoved **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** punched **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** punched **${target}** right through the drywall. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(80, 140),
            defence: randomIn(30, 50),
            maxHealth: randomIn(100, 600),
        }),
        () => ({
            name: "Bidoof",
            criesOfDespair: [
                "Bidoof",
                "bidoof",
                "Bidoof!",
                "bidoooooof!",
                "Bruh",
                "Bro",
            ],
            deathMessages: [
                "bidoof",
            ],
            winMessages: [
                "Bidoof!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** used Growl.`,
                weak: `**${name}** used Tackle. It did ${damage} hp damage.`,
                normal: `**${name}** used Headbutt. It did ${damage} hp damage.`,
                critical: `**${name}** used Superpower. It's super effective! It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(30, 50),
            defence: randomIn(50, 80),
            maxHealth: randomIn(100, 400),
        }),
        () => ({
            name: "Cow",
            criesOfDespair: [
                "mooo",
                "Moo",
                "moooo",
                "MOO!",
                "moooooo",
                "oink",
            ],
            deathMessages: [
                "ᵐᵒᵒ",
            ],
            winMessages: [
                "Moo!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** grazed.`,
                weak: `**${name}** mooed at **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** headbutted **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** trampled **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(10, 20),
            defence: randomIn(200, 500),
            criticalHitMultiplier: 1000,
            maxHealth: randomIn(100, 400),
        }),
        () => ({
            name: "Karen",
            criesOfDespair: [
                "Let me speak with your manager",
                "Out of my way, Barbara",
                "What's your name, I want your name",
                "Get me your manager",
                "I demand to speak with your manager",
                "The customer is always right",
                "I'm taking the kids",
                "I'm a mother, you know",
                "Do you know who I am?",
            ],
            chanceOfCrying: 0.9,
            deathMessages: [
                "I'm calling my lawyer",
                "I'll be leaving a Yelp review about this",
            ],
            winMessages: [
                "You better be getting your manager!",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** sighed dramatically.`,
                weak: `**${name}** threatened **${target}**. It did ${damage} hp damage.`,
                normal: `**${name}** called **${target}**'s manager. It did ${damage} hp damage.`,
                critical: `**${name}** left a bad Yelp review. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(50, 120),
            defence: randomIn(30, 80),
            maxHealth: randomIn(400, 500),
        }),
        () => ({
            name: "Oppressed Gamer",
            criesOfDespair: [
                "\\*sniff\\* Achsually, maining Peach in SmashBros is...",
                "Where's the mountain dew?",
                "GET OUT OF MY ROOM I'M PLAYING MINECRAFT!",
                "What's Mario's in-seam",
                "\\*Dorito dust covered fingers wiggling\\* Screw you, man. Your mum gay",
            ],
            chanceOfCrying: 0.8,
            deathMessages: [
                "HACK! YOU HACKED!",
            ],
            winMessages: [
                "gg ez",
                "L",
                "rekt",
            ],
            hitMessage: (hitType: HitType, name: string, target: string, damage: number) => ({
                miss: `**${name}** missed **${target}**.`,
                weak: `**${name}** talked smack. It did ${damage} hp damage.`,
                normal: `**${name}** clicked on **${target}**. It did ${damage} hp damage.`,
                critical: `**${name}** ${randomElement(["comboed", "headshot", "DDOSed"])} **${target}**. It did ${damage} hp damage.`,
            }[hitType]),
            strength: randomIn(10, 30),
            defence: randomIn(40, 80),
            maxHealth: randomIn(100, 300),
        }),
    ];

    const enemy = randomElement(enemies)();

    return new Enemy({
        ...enemy,
    });
}
