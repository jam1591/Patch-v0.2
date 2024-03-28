class Magazine{
    constructor(data){
        this.name = data.name;
        this.category = {
            type: data.category.type,
            name: data.category.name
        };
        this.remaining = data.remaining,
        this.capacity = data.remaining,
        this.color = "whitesmoke",
        this.reload = {
            time: data.reload.time,
            maxTime: data.reload.time,
            type: data.reload.type,
            ongoing: false,
            interval: null
        };
    }

    set_constructor(item){
        this.name = item.name;
        this.remaining = item.remaining,
        this.capacity = item.remaining,
        this.reload = {
            time: item.reload.time,
            maxTime: item.reload.time,
            type: item.reload.type
        };
    }

    rearm() {
        if (this.is_reload_start()) {
            this.set_magazine_reload_ongoing(true);
            this.rearm_interval();
        };
    };

    rearm_interval() {
        this.reload.interval = setInterval(() => { 
            this.do_magazine_reload();
        }, this.rearm_interval_rate());
    };

    rearm_interval_rate(){
        if(this.reload.type == WEAPON_RELOAD_TYPE.Standard    ) { return this.reload.maxTime / this.capacity; }
        else if (this.reload.type == WEAPON_RELOAD_TYPE.Charge) { return 16 };
    };

    rearm_interval_clear() {
        this.set_magazine_remaining_to_capacity();
        this.set_magazine_reload_time_to_maxTime();
        this.set_magazine_reload_ongoing(false);
        clearInterval(this.reload.interval);
    };

    do_magazine_reload() {
        if(this.reload.type == WEAPON_RELOAD_TYPE.Standard) this.do_magazine_reload_standard();
        else if (this.reload.type == WEAPON_RELOAD_TYPE.Charge) this.do_magazine_reload_charge();
    };

    do_magazine_reload_standard() {
        if (this.is_magazine_remaining_lessthan_capacity()) {
            this.incrament_magazine_remaining();
        } else {
            this.rearm_interval_clear() 
        };
    };

    do_magazine_reload_charge() {
        if (this.is_magazine_reload_time_above_zero()) {
            this.decrease_magazine_reload_time();
        } else {
            this.rearm_interval_clear() 
        };
    };

    is_reload_start() {
        return !this.is_magazine_reload_ongoing() && this.is_magazine_remaining_zero();
    };

    is_magazine_reload_ongoing() {
        return this.reload.ongoing;
    };

    is_magazine_remaining_zero() {
        return this.remaining == 0;
    };

    is_magazine_reload_time_above_zero() {
        return this.reload.time > 0;
    }
    
    is_magazine_remaining_lessthan_capacity() {
        return this.remaining < this.capacity;
    };

    set_magazine_reload_ongoing(bool) {
        this.reload.ongoing = bool;
    };

    set_magazine_remaining_to_capacity() {
        this.remaining = this.capacity;
    };

    set_magazine_reload_time_to_maxTime() {
        this.reload.time = this.reload.maxTime;
    };

    incrament_magazine_remaining() {
        this.remaining++;
    };

    decrease_magazine_remaining() {
        this.remaining--;
    };

    decrease_magazine_reload_time() {
        this.reload.time = Math.max(this.reload.time - 16, 0)
    }
}