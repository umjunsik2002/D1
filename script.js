class d1 extends Phaser.Scene {
    constructor() {
        super('d1');
    }
    preload() {
        this.load.path = './assets/';
        this.load.audio('horror_sound', 'Horror Sound Effect For Editing.mp3');
    }
    create() {
        this.graphics = this.add.graphics();
        this.cameras.main.setBackgroundColor('#000000');
        
        const texts = [
            {
                text: 'Once upon a time…',
                duration: 2000,
                style: {
                    fontFamily: 'Consolas',
                    fontSize: '36px',
                    color: '#666666',
                    align: 'center'
                }
            },
            {
                text: 'There was Pepe the frog',
                duration: 2000,
                style: {
                    fontFamily: 'Consolas',
                    fontSize: '48px',
                    color: '#999999',
                    align: 'center'
                }
            },
            {
                text: 'And he had a great idea',
                duration: 2000,
                style: {
                    fontFamily: 'Consolas',
                    fontSize: '72px',
                    color: '#b7b7b7',
                    align: 'center'
                }
            },
            {
                text: '"What if I make\na game using Phaser?"',
                duration: 2000,
                style: {
                    fontFamily: 'Consolas',
                    fontSize: '96px',
                    color: '#ffffff',
                    fontStyle: 'bold',
                    align: 'center'
                }
            }
        ];
          
        let currentTextIndex = 0;
          
        const addText = () => {
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;
            const currentText = texts[currentTextIndex];
            
            const text = this.add.text(centerX, centerY, currentText.text, currentText.style);
            text.setOrigin(0.5, 0.5);
            text.alpha = 0;
          
            this.tweens.add({
                targets: text,
                alpha: 1,
                ease: 'Linear',
                duration: currentText.duration,
                onStart: () => {
                    this.sound.play('horror_sound');
                },
                onComplete: () => {
                    if (currentTextIndex === texts.length - 1) {
                        this.cameras.main.shake(500);
                        this.time.delayedCall(500, () => {
                            this.scene.transition({
                                target: 'd2',
                                duration: 1000,
                                moveBelow: true,
                                onUpdate: null,
                                onComplete: null
                            });
                        }, [], this);
                    }
                    else {
                        this.tweens.add({
                            targets: text,
                            alpha: 0,
                            ease: 'Linear',
                            duration: currentText.duration,
                            onComplete: () => {
                                text.destroy();
                                currentTextIndex++;
                                if (currentTextIndex < texts.length) {
                                    addText();
                                }
                            }
                        });
                    }
                }
            });
        };
        
        addText();
    }
}

class d2 extends Phaser.Scene {
    constructor() {
        super('d2');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('rainbow_gradient', 'rainbow-gradient.png');
        this.load.audio('rush_E', 'Rush E  PuuCe Remix.mp3');
        this.load.image('pepe', 'pepe.png');
    }

    create() {
        this.add.image(0, 0, 'rainbow_gradient').setOrigin(0);
        const pepe = this.add.image(this.cameras.main.centerX - 300, this.cameras.main.height + 500, 'pepe');
        this.cameras.main.setViewport(this.cameras.main.width, 0, this.cameras.main.width, this.cameras.main.height);
        const rushESound = this.sound.add('rush_E', { loop: true });
        rushESound.play();
        
        const rectWidth = 480;
        const rectHeight = 120;

        const rect1 = this.add.rectangle(1000, 180, rectWidth, rectHeight, 0xea9999);
        const text1 = this.add.text(rect1.x, rect1.y, 'Play').setOrigin(0.5).setFontFamily('Consolas').setColor('#000000').setFontSize(48);
        rect1.setStrokeStyle(2, 0x000000);
        const group1 = this.add.group([rect1, text1]);

        const rect2 = this.add.rectangle(1000, 360, rectWidth, rectHeight, 0xf9cb9c);
        const text2 = this.add.text(rect2.x, rect2.y, 'Settings').setOrigin(0.5).setFontFamily('Consolas').setColor('#000000').setFontSize(48);
        rect2.setStrokeStyle(2, 0x000000);
        const group2 = this.add.group([rect2, text2]);

        const rect3 = this.add.rectangle(1000, 540, rectWidth, rectHeight, 0xffe599);
        const text3 = this.add.text(rect3.x, rect3.y, 'Get out of here').setOrigin(0.5).setFontFamily('Consolas').setColor('#000000').setFontSize(36);
        rect3.setStrokeStyle(2, 0x000000);
        const group3 = this.add.group([rect3, text3]);

        rect1.setInteractive()
        rect1.on('pointerdown', () => {
            this.scene.start('d3');
        });

        this.tweens.add({
            targets: this.cameras.main,
            x: 0,
            ease: 'Linear',
            duration: 500,
            onComplete: () => {
                rushESound.resume();
                this.tweens.add({
                    targets: pepe,
                    y: this.cameras.main.centerY,
                    ease: 'Linear',
                    duration: 500
                });
                this.tweens.add({
                    targets: group1,
                    x: 640,
                    ease: 'Linear',
                    duration: 500
                });
                this.tweens.add({
                    targets: group2,
                    x: 640,
                    ease: 'Linear',
                    duration: 500
                });
                this.tweens.add({
                    targets: group3,
                    x: 640,
                    ease: 'Linear',
                    duration: 500
                });
            }
        });
    }
}

class d3 extends Phaser.Scene {
    constructor() {
        super('d3');
    }
    create() {
        const finaltext = {
            text: 'THE END',
            style: {
                fontFamily: 'Consolas',
                fontSize: '96px',
                color: '#ffffff',
                align: 'center'
            }
        }
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        this.add.text(centerX+250, centerY+200, finaltext.text, finaltext.style);
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    scene: [d1, d2, d3]
}

let game = new Phaser.Game(config);