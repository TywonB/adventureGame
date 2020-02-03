const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('optionButtons');

let state = {}

var heroHealth = 100 // percentage
var heroMana = 100 // percentage
var heroEnergy = 100 // percentage
var heroAttackEnergyDepletion = 10 // percentage
var heroWeaponAttack = 30 // percentage
var heroWeaponAttackEnergyUsage = 10 // percentage
var groundQuake = 25 // percentage
var groundQuakeManaUsage = 20 // percentage
var fire = 25 // percentage
var fireManaUsage = 20 // percentage
var flashSpeed = 25 // percentage
var flashSpeedManaUsage = 20 // percentage
var enemyHealth = 50 // percentage
var enemyWeaponAttack = 20 // percentage
var dodgeEnergyUsage = 5 // percentage
var healingPotionsCost = 10 // points
var healingPotions = 100 // full heroHealth
var giantSpiderHealth = 100 // percentage
var giantSpiderAttack = 30 // percentage
var damageBoost = 10 // percentage
var manaBoost = 20 // percentage

function adventureGame() {
    state = {}
    showText(1)
}

function showText(textNodeID) {
    const textNode = questions.find(textNode => textNode.id === textNodeID)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
       optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(choice => {
        if (option(choice)) {
            const button = document.createElement('button')
            button.innerText = choice.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(choice))
            optionButtonsElement.appendChild(button)
        }
    })
}

function option(choice) {
    return choice.requiredState == null || choice.requiredState(state)
// ^^ we have no required state then we want to return true || if we don't have any required state then we're going to show the option
}

function selectOption(choice) {
    const nextTextNodeId = choice.nextText
    if (nextTextNodeId <= 0) {
        return adventureGame()
    }
    state = Object.assign(state, choice.setState) // take our state that we have currently it's going to add everything from options set state to it and override anything there so if option is true in state but false in our option set state it's going to set it to false in our state and this is going to return a brand new object which we're going to set to out current state
    showText(nextTextNodeId)
}

const questions = [
    {
        id: 1,
        text: 'As you are going home from the grocery store, you come across a treasure map and it is located across the world and that is when you decide to go on an amazing adventure! You run home to get prepared grabbing scrolls, your sword, and smoke grenades. Your bag has room for one more item. What will you bring with you?',
        options: [
            {
                text: 'Pickaxe',
                setState: {pickaxe: true},
                nextText: 2
            },
            {
                text: 'Lighter',
                setState: {lighter: true},
                nextText: 2
            },
            {
                text: 'Water Canister',
                setState: {canister: true},
                nextText: 2
            },
            {
                text: 'Compass',
                setState: {compass: true},
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: 'And off you go on your amazing adventure! And there you are approaching your first enemy but he didn\'t notice you yet. What do you want to do?',
        options: [
            {
                text: 'Sneaky',
                nextText: 3
            },
            {
                text: 'Fight',
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: 'You have chosen to sneak around.',
        options: [
            {
                text: 'Hide behind a tree to not get noticed',
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: 'You have chosen to fight. What move do you want to use?',
        options: [
            {
                text: 'Sword',
                nextText: 6
            },
            {
                text: 'Magic Skills',
                nextText: 7
            }
        ]
    },
    {
        id: 5,
        text: 'As you are behind the tree you decide to keep moving forward and you step on a stick alerting the enemy. What do you do now?',
        options: [
            {
                text: 'Fight the enemy',
                nextText: 4
            },
            {
                text: 'Throw an acorn to distract him',
                nextText: 8
            }
        ]
    },
    {
        id: 6,
        text: 'You and the enemy are having a sword battle! You two are going tit for tat but you swiftly attack him with a strong slice, leaving him at '+ (65 - heroWeaponAttack) +'%. Your energy is at '+ (heroEnergy - heroAttackEnergyDepletion) +'%. What will you do next?',
        options: [
            {
                text: 'Use one of your magic skills',
                nextText: 7
            },
            {
                text: 'Use your sword to finish him off',
                nextText: 9
            }
        ]
    },
    {
        id: 7,
        text: 'Which one you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 10
            },
            {
                text: 'Fire',
                nextText: 11
            },
            {
                text: 'Flash Speed',
                nextText: 12
            }
        ]
    },
    {
        id: 8,
        text: 'The enemy has been alerted into another direction now it\'s your chance to get away. You get away as sneaky as possible. You continue your adventure and stumble upon the Cavern of Gold. Do you enter?',
        options: [
            {
                text: 'Yes',
                nextText: 13
            },
            {
                text: 'No',
                setState: {gold: false},
                nextText: 14
            }
        ]
    },
    {
        id: 9,
        text: 'You are continuing to use your your sword and keep fighting the enemy. All of a sudden it seems as if he has gotten stronger. The enemy strikes at you and as you block it, a bit of the sword has been chipped off and he kicks you in the chest pushing you to the ground depleting your health to '+ (heroHealth - enemyWeaponAttack) +'% and now your energy is at '+ (90 - heroAttackEnergyDepletion) +'%. The enemy charges at you while you\'re still on the ground. What do you do?',
        options: [
            {
                text: 'Dodge Attack',
                nextText: 15
            },
            {
                text: 'Counterattack',
                nextText: 16
            }
        ]
    },
    {
        id: 10,
        text: 'You have chosen to use Ground Quake. You stomp the ground forcibly and break the ground making the enemy lose his balance and fall and hit his head. The enemy has died and you leave with ' + (heroEnergy - groundQuake) + '% of energy and ' + (heroMana - groundQuakeManaUsage) +'% of mana. After killing the enemy you continue your adventure and come upon the Cavern of Gold. Do you want to enter?',
        options: [
            {
                text: 'Yes',
                nextText: 13
            },
            {
                text: 'No',
                setState: {gold: false},
                nextText: 14
            }
        ]
    },
    {
        id: 11,
        text: 'You have chosen to use Fire. You scream in rage and start spinning on the ground roaring up a massive fire tornado burning anything in your path. The enemy gets severely burned but shockingly is not out for the count so you throw your sword at him and it penetrates through his chest killing him on sight. After that long enduring battle, you leave with ' + (heroEnergy - fire) + '% of energy and ' + (heroMana - fireManaUsage) +'% of mana. You retrieve your sword and continue your adventure and come up onto the Cavern of Gold. Do you want to enter?',
        options: [
            {
                text: 'Yes',
                nextText: 13
            },
            {
                text: 'No',
                setState: {gold: false},
                nextText: 14
            }
        ]
    },
    {
        id: 12,
        text: 'You have chosen to use Flash Speed. As he strikes down at the ground, the enemy looks and sees that you aren\'t there. The enemy turns around to see you and you dash back and forth hitting the enemy multiple times. The enemy has died due to the amount of damage he has taken and you leave with ' + (heroEnergy - flashSpeed) + '% of energy and ' + (heroMana - flashSpeedManaUsage) +'% of mana. After killing the enemy you continue your adventure and come up onto the Cavern of Gold. Do you want to enter?',
        options: [
            {
                text: 'Yes',
                nextText: 13
            },
            {
                text: 'No',
                setState: {gold: false},
                nextText: 14
            }
        ]
    },
    {
        id: 13,
        text: 'You enter deep off into the Cavern of gold and you are amazed by the amounts of gold you see. Do you collect the gold?',
        options: [
            {
                text: 'Yes',
                requiredState: (currentState) => currentState.pickaxe,
                setState: {gold: true},
                nextText: 17
            },
            {
                text: 'No',
                setState: {gold: false},
                nextText: 18
            }
        ]
    },
    {
        id: 14,
        text: 'You pass on going into the cave. As you keep moving forward, you come up on your next enemy. He was quickly alerted by seeing something (you) in the distance but can\'t make it out. He is walking closer to inspect what it is that he is seeing. What do you do?',
        options: [
            {
                text: 'Wait until he get closer to attack',
                nextText: 19
            },
            {
                text: 'Attack from afar',
                nextText: 20
            }
        ]
    },
    {
        id: 15,
        text: 'You roll and dodge his attack as he gets his sword stuck into the ground. You have a wide open opportunity for a strong attack to take him out for good and you strike at him and he\'s out for the count. After that long enduring battle, you leave with ' + (heroEnergy - dodgeEnergyUsage) + '%. You retrieve your sword and continue your adventure and come upon the Cavern of Gold. Do you want to enter?',
        options: [
            {
                text: 'Yes',
                nextText: 13
            },
            {
                text: 'No',
                setState: {gold: false},
                nextText: 14
            }
        ]
    },
    {
        id: 16,
        text: 'How do you counterattack?',
        options: [
            {
                text: 'Block with sword',
                nextText: 21
            },
            {
                text: 'With magic skill',
                nextText: 22
            }
        ]
    },
    {
        id: 17,
        text: 'Because of the amount of space you have in your bag, you can only collect $30 worth of gold and as you are about to walk an enemy is awaiting, staring at you evilly. He looks different from the other one, he\'s more lean. The enemy says all he wants is the gold. Do you give it to him?',
        options: [
            {
                text: 'Yes',
                setState: {gold: false},
                nextText: 23
            },
            {
                text: 'No',
                setState: {gold: true},
                nextText: 24
            }
        ]
    },
    {
        id: 18,
        text: 'You pass on collecting the gold but as you are about to walk an enemy is awaiting, staring at you evilly. He looks different from the other one, he\'s more lean. The enemy says that you are trespassing in his area and threatens to kill you because of what you saw. What do you want to do?',
        options: [
            {
                text: 'Fight',
                nextText: 25
            },
            {
                text: 'Run deeper into the cavern to lose sight of enemy',
                nextText: 26
            }
        ]
    },
    {
        id: 19,
        text: 'You chose to wait and he gets closer, he makes out what he sees and calls for his brother and he comes to assist. They both charge at you from the sides. What do you do?',
        options: [
            {
                text: 'Run Away',
                nextText: 27
            },
            {
                text: 'Use magic skill',
                nextText: 28
            }
        ]
    },
{
        id: 20,
        text: 'You think quick and throw down smoke grenades at the ground before he notices that it is you. He is confused and calls for his brother and they are both on a lookout for you but you are in a tree. What do you do?',
        options: [
            {
                text: 'Stealth kill',
                nextText: 29
            },
            {
                text: 'Loud',
                nextText: 30
            }
        ]
    },
    {
        id: 21,
        text: 'YOU HAVE DIED due to the enemy breaking your sword and striking you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 22,
        text: 'Which one you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 31
            },
            {
                text: 'Fire',
                nextText: 32
            },
            {
                text: 'Flash Speed',
                nextText: 33
            }
        ]
    },
    {
        id: 23,
        text: 'YOU HAVE DIED due to you agreeing to give him and he killed you for trespassing and taking his gold.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 24,
        text: 'You don\'t give him the gold and he is furious, fueled with rage. He traps you in the cavern by sealing the opening with rocks and you turn around and see lava coming towards you. What do you do?',
        options: [
            {
                text: 'Use pickaxe',
                requiredState: (currentState) => currentState.pickaxe,
                setState: {pickaxe: true},
                nextText: 34
            },
            {
                text: 'Use magic skill',
                nextText: 35
            }
        ]
    },
    {
        id: 25,
        text: 'You chose to fight. He filled with rage and traps you inside the cavern by sealing the opening with rocks and you turn around and see lava. What do you do?',
        options: [
            {
                text: 'Use pickaxe',
                requiredState: (currentState) => currentState.pickaxe,
                setState: {pickaxe: true},
                nextText: 34
            },
            {
                text: 'Use magic skill',
                nextText: 35
            }
        ]
    },
    {
        id: 26,
        text: 'YOU HAVE DIED due to you choosing to run away and the enemy has booby traps inside the cavern.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 27,
        text: 'You chose to run away but little do you know is that him and his brother have powers and they both speed in front of you and now you have nowhere else to run. What do you do?',
        options: [
            {
                text: 'Use magic skill',
                nextText: 36
            },
            {
                text: 'Fight using your sword',
                nextText: 37
            }
        ]
    },
    {
        id: 28,
        text: 'Which one do you want to use',
        options: [
            {
                text: 'Ground Quake',
                nextText: 38
            },
            {
                text: 'Fire',
                nextText: 39
            },
            {
                text: 'Flash Speed',
                nextText: 40
            }
        ]
    },
    {
        id: 29,
        text: 'While the smoke is still up you see one enemy to the left of the tree and you jump down on top of him and take him out and the other enemy come from around tree and see that you killed his brother. Fueled with rage, the enemy shoots fire at you severly burning you. Your health is at '+ (enemyWeaponAttack - 80) +'%. You are weakened, what do you do?',
        options: [
            {
                text: 'Go hide and recover',
                nextText: 41
            },
            {
                text: 'Use your last smoke grenade to escape',
                setState: {smoke: true},
                nextText: 42
            }
        ]
    },
    {
        id: 30,
        text: 'You choose to go loud and you leap down and scare the enemies. You catch them off guard and would the enemies. Their health is at '+ (heroWeaponAttack - enemyHealth) +'%. After you had attacked them, they both run passed you punching you multiple times, severly hurting you. What do you do now?',
        options: [
            {
                text: 'Use your last smoke grenade to escape',
                setState: {smoke: true},
                nextText: 42
            },
            {
                text: 'Get up and fight',
                nextText: 43
            }
        ]
    },
    {
        id: 31,
        text: 'With you being on the ground you have an great advantage of using Ground Quake. You smash the ground with your hand creating a split deep down into the earth\'s core and the enemy falls and dies. Your mana is at '+ (heroMana - 35) +'% and your energy is at '+ (heroEnergy - 65) +'. You continue your adventure and you stumble upon the Cavern of Gold. Do you enter?',
        options: [
            {
                text: 'Yes',
                setState: {cavern: true},
                nextText: 13
            },
            {
                text: 'No',
                setState: {cavern: false},
                nextText: 14
            }
        ]
    },
    {
        id: 32,
        text: 'You have chosen to use Fire and you spew out fire from your hands and he matches your energy by spewing fire at you too and to overpower the enemy you will have to use an extra 10% of mana. Will you use it?',
        options: [
            {
                text: 'Yes',
                setState: {cavern: true},
                nextText: 44
            },
            {
                text: 'No',
                setState: {cavern: false},
                nextText: 45
            }
        ]
    },
    {
        id: 33,
        text: 'You chose to use Flash Speed. The enemy spews fire but you dash out of the way and wrap around the tree, hitting the enemy multiple times, potentially injuring the enemy. Your mana is at '+ (heroMana - 45) +'% and your energy at '+ (heroEnergy - 80) +'%. The enemy gets furious and counters your attack and trips you in your tracks. You fall and he charges up and spews fire at you. What do you do?',
        options: [
            {
                text: 'Dodge and attack',
                setState: {cavern: false},
                nextText: 46
            }
        ]
    },
    {
        id: 34,
        text: 'YOU HAVE DIED due to the time it took for you to use the pickaxe and by that time the lava consumed you. Killing you instantly.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 35,
        text: 'Which one do you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 47
            },
            {
                text: 'Fire',
                nextText: 48
            },
            {
                text: 'Flash Speed',
                nextText: 49
            }
        ]
    },
    {
        id: 36,
        text: 'Which one do you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 50
            },
            {
                text: 'Fire',
                nextText: 51
            },
            {
                text: 'Flash Speed',
                nextText: 52
            }
        ]
    },
    {
        id: 37,
        text: 'YOU HAVE DIED due to you being outnumbered.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 38,
        text: 'You have chose to use Ground Quake. You crack the ground and break the earth\'s core and drop both of the enemies BUT one of the enemies hung onto the ledge but is severly hurt. He still tries to manage and come towards you. What do you do?',
        options: [
            {
                text: 'Kick him back into the split',
                nextText: 53
            },
            {
                text: 'Use your sword to finish him off',
                nextText: 54
            }
        ]
    },
    {
        id: 39,
        text: 'You chose to use Fire. You burst into flames and shoot fire out of your hands towards the enemies from both ways. They both shoot back but they\'re potentially going to overpower you. What do you do?',
        options: [
            {
                text: 'Use 10% more mana',
                nextText: 55
            },
            {
                text: 'Keep trying',
                nextText: 56
            }
        ]
    },
    {
        id: 40,
        text: 'You chose to use flash speed. You zip down the tree and pass them and start circling them faster and faster. They don\'t realize that they are losing air and pass out. While they are knocked out, you leave and you become tired from your long adventure. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 41,
        text: 'YOU HAVE DIED due to the enemy getting tired of your running at used his max power and burned down the whole forest plus you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 42,
        text: 'You use your last smoke grenade and get away from the enemy. He doesn\'t see you anymore, you are out of his sight. You continue your adventure and it starts to get darker and you stumble up on an abandoned house. Do you rest?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 43,
        text: 'YOU HAVE DIED due to you being severly hurt and can not continue to fight.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 44,
        text: 'You chose to use extra mana, leaving you at '+ (heroMana - fireManaUsage) +'%. You defeated the enemy leaving him dead and you continue your adventure. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 45,
        text: 'YOU HAVE DIED due to you being overpowered.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 46,
        text: 'You dodged the enemy\'s fire blast and stab him into his chest. The enemy is dead and you only have 5% of energy left and you continue your adventure. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 47,
        text: 'You chose to use Ground Quake and by using Ground Quake you have crumbled the rocks along with the enemy so you could escape. Your mana is at '+ (heroMana - 50) +'% and your energy is at '+ (heroEnergy - 40) +'%. You escaped the lava and your next enemy has seen what you did. What do you do?',
        options: [
            {
                text: 'Fight',
                nextText: 59
            }
        ]
    },
    {
        id: 48,
        text: 'YOU HAVE DIED due to you trying to use fire but only feeding to the lava and burning yourself.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 49,
        text: 'YOU HAVE DIED due to you trying to use flash speed but not having enough power to knock down the rocks and the lava ended up killing you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 50,
        text: 'You have chosen Ground Quake. You allow them to hit you costing you your health. You health is at '+ (heroHealth - enemyWeaponAttack) +'% but after you got them where you want them, you hit your fist on the ground bringing up cracks, tripping both of them. One is unconscious from hitting his head on the ground. The other\'s leg is broken. What do you do?',
        options: [
            {
                text: 'Knock him out and run',
                setState: {knockout: true},
                nextText: 60
            }
        ]
    },
    {
        id: 51,
        text: 'You chose to use fire. You charge up and you spin while spewing out fire attacking both of them. Their health is at '+ (enemyHealth - fire) +'% and your energy is at '+ (heroEnergy - 40) +'% and you mana is at '+ (heroMana - 50) +'%. What do you do?',
        options: [
            {
                text: 'Finish them off with a fire blast',
                nextText: 61
            },
            {
                text: 'Finish them with your sword',
                nextText: 62
            }
        ]
    },
    {
        id: 52,
        text: 'You chose to use flash speed. You zip pass them and start circling them faster and faster. They don\'t realize that they are losing air and pass out. While they are knocked out, you leave and you become tired from your long adventure. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 53,
        text: 'You run up to him and kick him back into the split. You get up tiredly and continue your adventure. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 54,
        text: 'You run up to him asnd decapitate his head. Your energy is at '+ (heroEnergy - 35) +'%. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 55,
        text: 'You chose to use extra mana, leaving you at '+ (heroMana - fireManaUsage - 10) +'%. You injure both of them leaving them at '+ (enemyHealth - fire) +'%. How will you finish them?.',
        options: [
            {
                text: 'With the sword',
                nextText: 63
            },
            {
                text: 'Knock them out and run',
                nextText: 64
            }
        ]
    },
    {
        id: 56,
        text: 'YOU HAVE DIED due to you being overpowered.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 57,
        text: 'You chose to rest in the house....',
        options: [
            {
                text: 'Next',
                nextText: 65
            }
        ]
    },
    {
        id: 58,
        text: 'You don\'t want to rest. You keep going on your adventure and notice that you are close to your destination. You look up and see a castle in the distance. Filled with joy, you try to hurry. There you are a few feet away from the castle\'s gates and an old lady comes up to you and offer you healing, energy, and mana potions 10 coins each. Do you accept?',
        options: [
            {
                text: 'Yes',
                requiredState: (currentState) => currentState.gold,
                setState: {potions: true, gold: false},
                nextText: 66
            },
            {
                text: 'No',
                setState: {potions: false, gold: true},
                nextText: 67
            }
        ]
    },
    {
        id: 59,
        text: 'You chose to fight. You and the enemy size each other up and he burst into flames and wildly shoots fire at you. What do you do?',
        options: [
            {
                 text: 'Shoot fire back',
                nextText: 68
           }
        ]
    },
    {
        id: 60,
        text: 'You knocked him out and ran to continue your adventure. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 61,
        text: 'You chose to use a fireball and throw a barrage of them at both enemies and they die. You go and continue your adventure and it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: '',
                nextText: 57
           },
           {
               text: '',
               nextText: 58
           }
        ]
    },
    {
        id: 62,
        text: 'You pull out your sword slowly and the sun reflects off of it. You run towards them and they spew fire at you but you duck it and cut their legs. They aren\'t mobile anymore. You have a great advantage, you go and decapitate them both. Your energy is at '+ (60 - heroWeaponAttackEnergyUsage) +'. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 63,
        text: 'You pull out your sword slowly and the sun reflects off of it. You run towards them and they spew fire at you but you duck it and cut their legs. They aren\'t mobile anymore. You have a great advantage, you go and decapitate them both. Your energy is at '+ (50 - heroWeaponAttackEnergyUsage) +'. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 64,
        text: 'You knocked them out and ran to continue your adventure. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 65,
        text: 'You survived through the night. You are well and rested and ready to continue your adventure. You approach the castle and before you get to the castle an old lady comes up to you and offer you healing, energy, and mana potions 10 coins each. Do you accept?',
        options: [
            {
                text: 'Yes',
                requiredState: (currentState) => currentState.gold,
                setState: {potions: true, gold: false},
                nextText: 66
            },
            {
                text: 'No',
                setState: {potions: false, gold: true},
                nextText: 67
            }
        ]
    },
    {
        id: 66,
        text: 'You decided to buy the potions. You approach and enter the castle and the first thing you hear is a loud screech. Goosebumps are all over your body you are nervous but your courage keeps you going. After checking multiple doors, there was this big door at the end of the hallway. You slightly open the door to a room with a mountain of treasure BUT there\'s a massive spider, the height of a skyscraper, on top of it.',
        options: [
            {
                text: 'Next',
                nextText: 69
           }
        ]
    },
    {
        id: 67,
        text: 'You denied the offer about buying the potions. You approach and enter the castle and the first thing you hear is a loud screech. Goosebumps are all over your body you are nervous but your courage keeps you going. After checking multiple doors, there was this big door at the end of the hallway. You slightly open the door to a room with a mountain of treasure BUT there\'s a massive spider, the height of a skyscraper, on top of it.',
        options: [
            {
                text: 'Next',
                nextText: 70
           }
        ],
    },
    {
        id: 68,
        text: 'He wildly shot fire at you and misses. You charge your power up and shoot fire at him. It hit him on contact. Your energy is at '+ (heroEnergy - 60) +'% and your mana is at '+ (50 - fireManaUsage) +'%. He\'s severly hurt but still manages to fight. What do you do?',
        options: [
            {
                text: 'Use sword',
                nextText: 71
           },
           {
               text: 'Use another magic skill',
               nextText: 72
           }
        ]
    },
    {
        id: 69,
        text: 'You try to get inside the room but the door makes a loud squeaking sound and the spider sees you and instantly spits a strong web at you and now you are stuck. The spider is on it way to come get you. What do you do?',
        options: [
            {
                text: 'Use sword to escape',
                nextText: 73
           },
           {
               text: 'Use magic skill',
               nextText: 74
           }
        ]
    },
    {
        id: 70,
        text: 'You try to get inside the room but the door makes a loud squeaking sound and the spider sees you and instantly spits a strong web at you and now you are stuck. The spider is on it way to come get you. What do you do?',
        options: [
            {
                text: 'Use sword to escape',
                nextText: 73
           },
           {
               text: 'Use magic skill',
               nextText: 75
           }
        ]
    },
    {
        id: 71,
        text: 'You pull out your sword slowly and the sun reflects off of it. You run towards him and he spew fire at you but you duck it and cut his legs. He isn\'t mobile anymore. You have a great advantage, you go and decapitate him. Your energy is at '+ (60 - heroWeaponAttackEnergyUsage) +'. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 72,
        text: 'Which one you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 76
            },
            {
                text: 'Fire',
                nextText: 77
            },
            {
                text: 'Flash Speed',
                nextText: 78
            }
        ]
    },
    {
        id: 73,
        text: 'YOU HAVE DIED due to you trying to use your sword but you were stuck.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 74,
        text: 'Which one you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 79
            },
            {
                text: 'Fire',
                nextText: 80
            },
            {
                text: 'Flash Speed',
                nextText: 81
            }
        ]
    },
    {
        id: 75,
        text: 'Which one you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 79
            },
            {
                text: 'Fire',
                nextText: 80
            },
            {
                text: 'Flash Speed',
                nextText: 81
            }
        ]
    },
    {
        id: 76,
        text: 'You stomp your foot and create a split deep into the Earth\'s core and he falls in it. Your energy is at '+ (heroEnergy - 70) +'% and your mana is at '+ (75 - groundQuakeManaUsage) +'%. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 77,
        text: 'You use fire at him again burning him even more and kill him on sight. Your energy is at '+ (heroEnergy - 70) +'% and your mana is at '+ (75 - fireManaUsage) +'%. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 78,
        text: 'You use flash speed and hit the enemy constantly knocking him out cold and you see your chance to get away. Your energy is at '+ (heroEnergy - 70) +'% and your mana is at '+ (75 - flashSpeedManaUsage) +'%. After a long aventurist day, it starts to become dark and you come up on an abandoned house. Do you go inside to rest up?',
        options: [
            {
                text: 'Yes',
                nextText: 57
            },
            {
                text: 'No',
                nextText: 58
            }
        ]
    },
    {
        id: 79,
        text: 'YOU HAVE DIED due to you wanting to use Ground Quake but you can\'t because you stuck to a wall.',
        options: [
            {
                text: 'Restart',
                nextText: -1
           }
        ]
    },
    {
        id: 80,
        text: 'You chose to use fire and burst into flames to get out of the webs before the spider came to you. Your energy is at '+ (heroEnergy - fire) +'% and your mana is at '+ (heroMana - fireManaUsage) +'%. The spider is still walking towards you and strikes at you multiple times. Naturally, you dodge the attacks and go to find a spot to hide to come up with a plan. What do you want to do?',
        options: [
            {
                text: 'Throw an item to distract him', // attack from behind
                nextText: 83
           }
        ]
    },
    {
        id: 81,
        text: 'YOU HAVE DIED due to you trying to use flash speed but you were stuck.',
        options: [
            {
                text: 'Restart',
                nextText: -1
           }
        ]
    },
    // {
    //     id: 82,
    //     text: 'YOU HAVE DIED due to you trying to use a magic skill but because you didn\'t buy potions so you didn\'t have any energy left.',
    //     options: [
    //         {
    //             text: 'Restart',
    //             nextText: -1
    //        }
    //     ]
    // },
    {
        id: 83,
        text: 'You threw a brick towards the other side of the room and distracted the spider. You climb up a pillar and jump onto the spider and stab him with your sword. Your sword gets stuck. The spider health is at '+ (giantSpiderHealth - heroWeaponAttack) +'%. The spider screeches and slings you off of its back into a pillar. The spider is now coming towards you and hit the pillar having it fall on you. Your health is at '+ (heroHealth - 15) +'%. You dig yourself out from the rubble. As you dig yourself out, you see the spider looking over you and he is about to attack. What do you do?',
        options: [
            {
                text: 'Dodge and Attack',
                nextText: 84
           }
        ]
    },
    {
        id: 84,
        text: 'You were crawling away from its attacks as they kept getting closer and closer then you crawl up into some rubble and throw dust into its eyes. Its eyes are stinging and the spider is screeching loud. What do you do while the spider is hurting.',
        options: [
            {
                text: 'Use your magic skill',
                nextText: 85
           }
        ]
    },
    {
        id: 85,
        text: 'Which one you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 86
            },
            {
                text: 'Fire',
                nextText: 87
            },
            {
                text: 'Flash Speed',
                nextText: 88
            }
        ]
    },
    {
        id: 86,
        text: 'You use Ground Quake and stomp the ground and break the ground, making the spider getting his leg stuck in a hole. You also jump up and down making the ceiling fall on the spider head. Your energy is at '+ (75 - heroAttackEnergyDepletion) +'% and your mana is at '+ (80- groundQuakeManaUsage) +'%. The spider health is at '+ (70 - groundQuake) +'%. The spider forced his leg out and now is furious. He swing his leg and attacks you, throwing you into a wall. Your health is at '+ (85 - giantSpiderAttack) +'%. The spider spits a barrage of webs and you what do you do?',
        options: [
            {
                text: 'Dodge',
                nextText: 89
           },
           {
               text: 'Use sword',
               nextText: 90
           },
           {
               text: 'Use magic skill',
               nextText: 91
           }
        ]
    },
    {
        id: 87,
        text: 'You use fire and conjure up a fire tornado and sucking in the spider and spinning the spider around multiple times. The spider is dizzy and wounded. Your energy is at '+ (75 - heroAttackEnergyDepletion) +'% and your mana is at '+ (80 - fireManaUsage) +'%. The spider health is at '+ (70 - fire) +'%. The spider regains focus and now is furious. He swing his leg and attacks you, throwing you into a wall. Your health is at '+ (85 - giantSpiderAttack) +'%. The spider spits a barrage of webs and you what do you do?',
        options: [
            {
                text: 'Dodge',
                nextText: 89
           },
           {
               text: 'Use sword',
               nextText: 90
           },
           {
               text: 'Use magic skill',
               nextText: 91
           }
        ]
    },
    {
        id: 88,
        text: 'You use flash speed and you do something differently this time. You use your sword as well and you run and cut the spider in multiple places. Wounding it severly. The spider health is at '+ (70 - flashSpeed) +'%. Your energy is at '+ (75 - heroAttackEnergyDepletion) +'% and your mana is at '+ (80 - flashSpeedManaUsage) +'%. The spider swing its leg and attacks you, throwing you into a wall. Your health is at '+ (85 - giantSpiderAttack) +'%. The spider spits a barrage of webs at you, what do you do?',
        options: [
            {
                text: 'Dodge',
                nextText: 89
           },
           {
               text: 'Use sword',
               nextText: 90
           },
           {
               text: 'Use magic skill',
               nextText: 91
           }
        ]
    },
    {
        id: 89,
        text: 'You dodge 3 of the webs but they were coming at you too fast and the 4th one hit you. You\'re once again stuck on the wall but this time he came at you faster and hit you multiple times. Your health is at '+ (55 - giantSpiderAttack) +'% and your energy is at '+ (90 - dodgeEnergyUsage - dodgeEnergyUsage - dodgeEnergyUsage) +'%. The spider thinks you are dead and leaves you. What do you do?',
        options: [
            {
                text: 'Use magic skill',
                nextText: 92
           },
           {
               text: 'Take potions',
               requiredState: (currentState) => currentState.potions,
               setState: {potions: false},
               nextText: 93
           }
        ]
    },
    {
        id: 90,
        text: 'You attempt to use your sword but as you block one the webs it snatches your sword away from you. You\'re once again stuck on the wall but this time he came at you faster and hit you multiple times. Your health is at '+ (55 - giantSpiderAttack) +'% and your energy is at '+ (90 - dodgeEnergyUsage - dodgeEnergyUsage - dodgeEnergyUsage) +'%. The spider thinks you are dead and leaves you. What do you do?',
        options: [
            {
                text: 'Use magic skill',
                nextText: 92
           },
           {
               text: 'Take potions',
               requiredState: (currentState) => currentState.potions,
               setState: {potions: false},
               nextText: 93
           }
        ]
    },
    {
        id: 91,
        text: 'What do you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 94
           },
           {
               text: 'Fire',
               nextText: 95
           },
           {
               text: 'Flash Speed',
               nextText: 96
           }
        ]
    },
    {
        id: 92,
        text: 'What do you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 97
           },
           {
               text: 'Fire',
               nextText: 98
           },
           {
               text: 'Flash Speed',
               nextText: 99
           }
        ]
    },
    {
        id: 93,
        text: 'As he walks away, you take the energy, mana, and healing potions. You get up as if nothing happened. What do you do now?',
        options: [
            {
                text: 'Use magic skill',
                nextText: 100
           }
        ]
    },
    {
        id: 94,
        text: 'You attempt to use ground quake but it doesn\'t work to your favor so you\'re stuck once again on the wall but this time he came at you faster and hit you multiple times. Your health is at '+ (55 - giantSpiderAttack) +'% and your energy is at '+ (65 - dodgeEnergyUsage - dodgeEnergyUsage - dodgeEnergyUsage) +'%. The spider thinks you are dead and leaves you. What do you do?',
        options: [
            {
                text: 'Use magic skill',
                nextText: 92
           },
           {
               text: 'Take potions',
               requiredState: (currentState) => currentState.potions,
               setState: {potions: false},
               nextText: 93
           }
        ]
    },
    {
        id: 95,
        text: 'As the barrage of webs come towards you, you use your fire power and burn every web. The spider is now furious and comes rushing towards you and you also use your fire power and make a fire wave on him. The spider health is at '+ (45 - fire) +'%. Your energy is at '+ (50 - fire) +'% and your mana is at '+ (60 - fireManaUsage) +'%. What will you do to finish him?',
        options: [
            {
                text: 'Use one last magic skill',
                nextText: 101
           }
        ]
    },
    {
        id: 96,
        text: 'As the barrage of webs come towards you, you use uour flash speed to dodge everyone of them. The spider lost sight of you and you grab your sword off of the spider back and stab him multiple times in various places. He\'s wounded but still stands and he did a fast spin and hit you with his legs. The spider health is at '+ (45 - flashSpeed - heroWeaponAttack) +'%. Your energy is at '+ (50 - flashSpeed) +'% and your mana is at '+ (60 - flashSpeedManaUsage) +'% and your health is at '+ (55 - giantSpiderAttack) +'%. What will you do to finish him?',
        options: [
            {
                text: 'Use one last magic skill',
                nextText: 101
           }
        ]
    },
    {
        id: 97,
        text: 'You get up furious and you stomp your foot hard to the ground and you make a concrete vortex attempting to crush the spider and anything else that gets sucked in but the vortex was too small so you decide to use the rest of your energy to create a big enough vortex and the spider is sucked in and you killed him. You are weak but you are relieved that your adventure is finally over. You get your treasure and head home. And Little Poe LIVES HAPPILY EVER AFTER!',
        options: [
            {
                text: 'Restart',
                nextText: -1
           }
        ]
    },
    {
        id: 98,
        text: 'You get up furious and charge up to use the rest of your energy for this last move. You make a fire wall to trap him inside and you bring up a wave of lava from the earth\'s core and cover the spider in lava killing him in a matter of seconds. You are weak but you are relieved that your adventure is finally over. You get your treasure and head home. And Little Poe LIVES HAPPILY EVER AFTER!',
        options: [
            {
                text: 'Restart',
                nextText: -1
           }
        ]
    },
    {
        id: 99,
        text: 'You get up furious and charge up to use the rest of your energy for the last move. You run so fast that you are faster than light and you are becoming electric and you use that to your advantage. You keep running to gain more power and when you\'re done, you shoot the electricity at the spider, frying him inside out. And it\'s done, the spider is dead and you are weak but you are relieved that your adventure is finally over. You get your treasure and head home. And Little Poe LIVES HAPPILY EVER AFTER!',
        options: [
            {
                text: 'restart',
                nextText: -1
           }
        ]
    },
    {
        id: 100,
        text: 'After taking all of the potions, you do something you haven\'t even tried yet. You attempt to use all of your powers at once. You use your ground quake first in order to get the spider stuck and then use run in a circle around the spider while spewing out fire making a big fire tornado burning him enough to where the spider is starting to melt. The spider is dead and you barely have any energy left but you very thankful that this adventure is over. You get your treasure and head home. And Little Poe LIVES HAPPILY EVER AFTER!',
        options: [
            {
                text: 'Restart',
                nextText: -1
           }
        ]
    },
    {
        id: 101,
        text: 'What do you want to use?',
        options: [
            {
                text: 'Ground Quake',
                nextText: 102
           },
           {
               text: 'Fire',
               nextText: 103
           },
           {
               text: 'Flash Speed',
               nextText: 104
           }
        ]
    },
    {
        id: 102,
        text: 'You are furious and you stomp your foot hard to the ground and you make a concrete vortex attempting to crush the spider and anything else that gets sucked in but the vortex was too small so you decide to use the rest of your energy to create a big enough vortex and the spider is sucked in and you killed him. You are weak but you are relieved that your adventure is finally over. You get your treasure and head home. And Little Poe LIVES HAPPILY EVER AFTER!',
        options: [
            {
                text: 'Restart',
                nextText: -1
           }
        ]
    },
    {
        id: 103,
        text: 'You are furious and charge up to use the rest of your energy for this last move. You make a fire wall to trap him inside and you bring up a wave of lava from the earth\'s core and cover the spider in lava killing him in a matter of seconds. You are weak but you are relieved that your adventure is finally over. You get your treasure and head home. And Little Poe LIVES HAPPILY EVER AFTER!',
        options: [
            {
                text: 'Restart',
                nextText: -1
           }
        ]
    },
    {
        id: 104,
        text: 'You are furious and charge up to use the rest of your energy for the last move. You run so fast that you are faster than light and you are becoming electric and you use that to your advantage. You keep running to gain more power and when you\'re done, you shoot the electricity at the spider, frying him inside out. And it\'s done, the spider is dead and you are weak but you are relieved that your adventure is finally over. You get your treasure and head home. And Little Poe LIVES HAPPILY EVER AFTER!',
        options: [
            {
                text: 'restart',
                nextText: -1
           }
        ]
    }
]

adventureGame()

// options: fight or throw acorn away from you to distract him

// to check to see if hero has the item(s) needed

// {
//     id: 3,
//     text: '',
//     options: [
//         {
//             text: '',
//        
//             nextText: 4
//        },
//        {
//            text: '',
//       
//            nextText: 4
//        }
//     ]
// }

// {
//     text: '',
//
//     nextText: 4
// }

var canWidth = 117;
var canHeight = 135;

// the position where the frame will be drawn
var x = 0;
var y = 0;

var srcX;
var srcY;

var sheetWidth = 920;
var sheetHeight = 137;

var cols = 8;
var rows = 1;

var width = sheetWidth / cols;
var height = sheetHeight / rows;

var currentFrame = 0;

var character = new Image();
character.src = "character.png";

var canvas = document.getElementById('canvas');
canvas.width = canWidth;
canvas.height = canHeight;
var context = canvas.getContext('2d')

function updateFrame() {
    currentFrame = ++currentFrame % cols; // 1 % 8 = 1
    srcX = currentFrame * width;
    srcY = 0;

    context.clearRect(x,y, width, height)
}

function drawImage () {
    updateFrame();
    context.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}

setInterval(function() {
    drawImage();
}, 1000/10 );