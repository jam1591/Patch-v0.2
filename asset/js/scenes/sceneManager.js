class SceneManager {
    constructor(scenes) {
        this.scenes = scenes;
        this.current = this.scenes[SCENES.Town];

        this.transition = {
            opacity: 1,
            inProgress: false,
            speed: 0.02,
            intervalRate: 16
        };

        this.setup();
    };

    update() {
        this.current.update();
        this.moveToTownOnPlayerDeath();
        this.moveToArenaFromTown();
    };

    draw() {
        CTX.globalAlpha = this.transition.opacity;
        this.current.draw(this.transition.opacity);
    };

    moveToTownOnPlayerDeath() {
        this.changeSceneIf(() => this.shouldMoveToTownOnPlayerDeath(), SCENES.Town);
    }
    
    moveToArenaFromTown() {
        this.changeSceneIf(() => this.shouldMoveToArenaFromTown(), SCENES.Arena);
    }
    
    shouldMoveToTownOnPlayerDeath() {
        return this.current.member.player.hp <= 0 && this.transition.opacity == 1;
    }
    
    shouldMoveToArenaFromTown() {
        return this.current.name === SCENES.Town && this.current.member.portal.interact && this.transition.opacity == 1;
    }
    
    changeSceneIf(conditionFunction, sceneName) {
        
        if (conditionFunction()) {   
            this.fadeOut(() => this.switchToScene(sceneName));
        }
        this.fadeIn();
    }
    
    switchToScene(sceneName) {
        this.current.reset();
        this.current = this.scenes[sceneName];
        this.current.setup();
    }

    fadeOut(callback) {
        if (!this.isTransitionInProgress() && this.transition.opacity !== 0) {
            this.transition.inProgress = true;
            this.startTransition(() => this.decreaseOpacity(), () => this.isOpacityZero(), callback);
        }
    }
    
    fadeIn() {
        if (this.isTransitionInProgress() && this.transition.opacity === 0) {
            this.startTransition(() => this.increaseOpacity(), () => this.isOpacityOne(), this.transition.inProgress = false);
        }
    }
    
    startTransition(operation, condition, callback) {
        let interval = setInterval(() => {
            operation();
            if (condition()) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, this.transition.intervalRate);
    }
    
    isOpacityZero() {
        return this.transition.opacity === 0;
    }
    
    isOpacityOne() {
        return this.transition.opacity === 1;
    }
    
    isTransitionInProgress() {
        return this.transition.inProgress;
    }
    
    decreaseOpacity() {
        this.transition.opacity = Math.max(0, this.transition.opacity - this.transition.speed);
    }
    
    increaseOpacity() {
        this.transition.opacity = Math.min(1, this.transition.opacity + this.transition.speed);
    }

    setup() {
        this.current.setup();
    };
};