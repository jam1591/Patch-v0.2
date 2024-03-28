class Shop extends Npc{
    constructor(data, player, shelf) {
        super(data);
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.player = player;
        this.color = data.color;

        this.shelf = shelf;

        this.sideMenuOptions = {
            Firearm: {
                Pistol: "Pistol",
                Rifle: "Rifle",
                SniperRifle: "Sniper Rifle"
            },
            Incendiary: {
                Flamethrower: "Flamethrower"
            }
        };

        this.menu = {
            shop: '',
            navigation: '',
            upgrades: {
                magazine: '',
                matrix: ''
            }
        };

        this.current = '';
        this.imgSrc = data.img;
        this.img = new Image();
        this.img.src = this.imgSrc;
    }

    setup(){
        this.menu.shop = `
            <div id="shop_container" class="grid_container">
                <div class="side_nav">
                    <div class="shop_container_header">
                        <h2>CATEGORIES</h2>
                    </div>
                    ${this.setup_add_to_side_nav_div()}
                </div>
                <div class="upgrades">
                    <div class="shop_container_header">
                        <h2>UPGRADES</h2>
                    </div>
                    <div id="upgrades_magazine">
                        <h3>MAGAZINE</h3>
                        <div id="upgrades_magazine_cards" class="cards">
                        </div>
                    </div>
                    <div id="upgrades_matrix" >
                        <h3>MATRIX</h3>
                        <div id="upgrades_matrix_cards" class="cards">
                        </div>
                    </div>
                </div>
                <button id="close_btn"><strong>X</strong></button>
            </div>
        `;
    }

    setup_add_to_side_nav_div() {
        let section = ``;
        const enumsKeys = Object.keys(this.sideMenuOptions);
        for (let i = 0; i < enumsKeys.length; i++) {
            const category = enumsKeys[i];
            const subEnums = this.sideMenuOptions[category];
            section += `
                <div id="${category}" class="dropdown">
                    <div class="dropdown-toggle">${category}</div>
                    <div class="dropdown-content">
            `;
            const subKeys = Object.keys(subEnums);
            for (let j = 0; j < subKeys.length; j++) {
                const subCategory = subKeys[j];
                const value = subEnums[subCategory];
                section += `<p id="${value}" class="dropdown-content-item">${value}</p>`;
            }
            section += `
                    </div>
                </div>
            `;
        }

        return section;
    };

    draw() {
        this.colission(this.player);
        CTX.drawImage(this.img, this.x, this.y);
    };

    update() {
        this.open_menu();
    };

    open_menu(){
        if (this.player.controls.interact && UTILS.overlap(this.player, this)) {
            this.interact = true;
            GAME.innerHTML = this.menu.shop;
            this.add_event_close_button();
            this.add_event_select_category();
            this.add_event_select_sub_category();
        } else if (!UTILS.overlap(this.player, this)){
            this.interact = false;
            GAME.innerHTML = '';
        }
    }

    add_event_close_button(){
        document.getElementById('close_btn').addEventListener('click', () => this.event_close_menu());
    }

    add_event_select_category(){
        document.querySelectorAll('.dropdown-toggle').forEach(item => {
            item.addEventListener('click', () => this.event_select_category(item));
        });
    }

    add_event_select_sub_category(){
        document.querySelectorAll('.dropdown-content').forEach(item => {
            item.addEventListener('click', (e) => this.event_select_sub_category(e))
        });
    }
    
    event_close_menu(){
        this.interact = false;
        GAME.innerHTML = '';
        this.current= '';
    }

    event_select_category(item){
        const dropdownContent = item.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    }

    event_select_sub_category(e){
        if (e.target.classList.contains('dropdown-content-item')) {
            const selectedItem = e.target;
            this.current = selectedItem.innerHTML;
            this.select_item(selectedItem)
            this.change_current_weapon();
            document.querySelector('#upgrades_magazine .cards').innerHTML = this.update_html_upgrades_magazine_div();
            document.querySelector('#upgrades_matrix .cards').innerHTML = this.update_html_upgrades_matrix_div();
            this.add_event_select_magazine_upgrade();
            this.add_event_select_matrix_upgrade();
        }
    }

    select_item(itemToSelect){
        document.querySelectorAll('.dropdown-content-item').forEach(item => {
            item.classList.remove('selected');
        });
        itemToSelect.classList.add('selected');
    }

    change_current_weapon(){
        for (let i = 0; i < this.player.inventory.arsenal.length; i++) {
            if(this.current == this.player.inventory.arsenal[i].name){
                this.player.currentWeapon = this.player.inventory.arsenal[i];
            }
        }
    }

    update_html_upgrades_magazine_div(){
        let section = ``;
        for (let j = 0; j < this.shelf.magazine.length; j++) {
            if(this.shelf.magazine[j].category.name == this.current){
                if( this.player.currentWeapon.component.magazine.name == this.shelf.magazine[j].name) {
                    section += `<div id="${j}" class="card color" style="background-color: #72751b">`
                } else {
                    section += `<div id="${j}" class="card color">`
                }
                section += `
                        <p class="tip">${this.shelf.magazine[j].name}</p>
                        <p class="second-text">Ammo: ${this.shelf.magazine[j].remaining}</p>
                        <p class="second-text">Reload Speed: ${this.shelf.magazine[j].reload.time/1000} sec</p>
                `;

               if(this.shelf.magazine[j].name == WEAPON_MODIFIER.Basic){
                    section += `
                        <p class="second-text" style="color: #f7ba00"><strong>DEFAULT</strong></p>
                        </div>  
                    `;
                } else if (this.shelf.magazine[j].gold == 0){
                    section += `
                        <p class="second-text" style="color: #f7ba00"><strong>PURCHASED</strong></p>
                        </div>  
                    `;
                } else {
                    section += `
                    <p class="second-text" style="color: #f7ba00"><strong>PRICE: ${this.shelf.magazine[j].gold}</strong></p>
                    </div>  
                `;
                }
            }
        }
        return section;
    };

    update_html_upgrades_matrix_div(){
        let section = ``;
        for (let j = 0; j < this.shelf.matrix.length; j++) {
            if(this.shelf.matrix[j].category.name == this.current){
                if(this.player.currentWeapon.component.matrix.name === this.shelf.matrix[j].name) {
                    section += `<div id="${j}" class="card color" style="background-color: #72751b">`
                } else {
                    section += `<div id="${j}" class="card color">`
                };

                if(this.player.currentWeapon.component.matrix.category.type == WEAPON_TYPE.Firearm){
                    section += `
                            <p class="tip">${this.shelf.matrix[j].name}</p>
                            <p class="second-text">Matrix Damage: ${this.shelf.matrix[j].baseDamageMultiplier}</p>
                            <p class="second-text">Bullet Speed: ${this.shelf.matrix[j].bullet.speed}</p>
                            <p class="second-text">Bullet Damage: ${this.shelf.matrix[j].bullet.damage}</p>
                    `;
                } else if (this.player.currentWeapon.component.matrix.category.type == WEAPON_TYPE.Incendiary){
                    section += `
                            <p class="tip">${this.shelf.matrix[j].name}</p>
                            <p class="second-text">Thermal Damage: ${this.shelf.matrix[j].thermalDamage}</p>
                            <p class="second-text">Range: ${this.shelf.matrix[j].radius}</p>
                            <p class="second-text">Arc°: ${this.shelf.matrix[j].angle_in_degrees}</p>
                    `;                   
                }

                if(this.shelf.matrix[j].name == WEAPON_MODIFIER.Basic){
                    section += `
                        <p class="second-text" style="color: #f7ba00"><strong>DEFAULT</strong></p>
                        </div>  
                    `;
                } else if (this.shelf.matrix[j].gold == 0){
                    section += `
                        <p class="second-text" style="color: #f7ba00"><strong>PURCHASED</strong></p>
                        </div>  
                    `;
                } else {
                    section += `
                    <p class="second-text" style="color: #f7ba00"><strong>PRICE: ${this.shelf.matrix[j].gold}</strong></p>
                    </div>  
                `;
                }
            }
        }
        return section;
    };

    add_event_select_magazine_upgrade(){
        const parent = document.getElementById('upgrades_magazine_cards');
        for (const child of parent.children) {
            this.select_magazine_upgrade(child, parent);
        }
    }
    
    select_magazine_upgrade(child, parent){
        child.addEventListener('click', () => {
            if(this.player.inventory.gold >= this.shelf.magazine[child.attributes[0].value].gold){
                for (const child of parent.children) {
                    child.style.backgroundColor = "#1b1b1b";
                }
                child.style.backgroundColor = "#72751b";  
                this.player.currentWeapon.component.magazine.set_constructor(this.shelf.magazine[child.attributes[0].value]);
                this.player.inventory.gold -= this.shelf.magazine[child.attributes[0].value].gold;
                this.shelf.magazine[child.attributes[0].value].gold = 0;
                const paragraphCount = Object.keys(child.children).length;
                child.children[paragraphCount -1].innerHTML = `<strong>PURCHASED</strong>`;
            }

        });
    }

    add_event_select_matrix_upgrade(){
        const parent = document.getElementById('upgrades_matrix_cards');
        for (const child of parent.children) {
            this.select_matrix_upgrade(child, parent);
        }
    }

    select_matrix_upgrade(child, parent){
        child.addEventListener('click', () => {
            if(this.player.inventory.gold >= this.shelf.matrix[child.attributes[0].value].gold){
                for (const child of parent.children) {
                    child.style.backgroundColor = "#1b1b1b";
                }
                child.style.backgroundColor = "#72751b";  
                this.player.currentWeapon.component.matrix.set_constructor(this.shelf.matrix[child.attributes[0].value]);
                this.player.inventory.gold -= this.shelf.matrix[child.attributes[0].value].gold;
                this.shelf.matrix[child.attributes[0].value].gold = 0;
                const paragraphCount = Object.keys(child.children).length;
                child.children[paragraphCount -1].innerHTML = `<strong>PURCHASED</strong>`;
            }
        });
    }
}