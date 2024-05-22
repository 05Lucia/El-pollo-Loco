const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloude()
    ],
    [
        new BackgroundObject('./img/5_background/layers/air.png', -719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('./img/5_background/layers/air.png', 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/air.png', 719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ],
    [
        new StatusBar(10, [
            './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
        ], 100),
        new StatusBar(180, [
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
        ], 0),
        new StatusBar(350, [
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
        ], 0),
        new StatusBar(520, [
            './img/7_statusbars/2_statusbar_endboss/green/green0.png',
            './img/7_statusbars/2_statusbar_endboss/green/green20.png',
            './img/7_statusbars/2_statusbar_endboss/green/green40.png',
            './img/7_statusbars/2_statusbar_endboss/green/green60.png',
            './img/7_statusbars/2_statusbar_endboss/green/green80.png',
            './img/7_statusbars/2_statusbar_endboss/green/green100.png'
        ], 100),
    ],
    [
        new CollectableObjects(360, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new CollectableObjects(360, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new CollectableObjects(360, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new CollectableObjects(360, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new CollectableObjects(360, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
    ],
    [
        new CollectableObjects(150, './img/8_coin/coin_2.png'),
        new CollectableObjects(150, './img/8_coin/coin_2.png'),
        new CollectableObjects(150, './img/8_coin/coin_2.png'),
        new CollectableObjects(150, './img/8_coin/coin_2.png'),
        new CollectableObjects(150, './img/8_coin/coin_2.png')  
    ]
);