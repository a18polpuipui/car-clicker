

//Model
const model = {
    currentcat: null,
    cats: [
        {
            clickCount: 0,
            name: 'Michifu',
            imgSrc: 'img/gato1.jpg',
        },
        {
            clickCount: 0,
            name: 'Minino',
            imgSrc: 'img/gato2.jpg',
        },
        {
            clickCount: 0,
            name: 'Garfield',
            imgSrc: 'img/gato3.jpg',
        },
        {
            clickCount: 0,
            name: 'Minchi',
            imgSrc: 'img/gato.jpg',
        },
      
    ],
};

// Controller
const controller = {
    init() {
        model.currentcat = model.cats[0];
        catListView.init();
        catView.init();
    },
    getCurrentcat() {
        return model.currentcat;
    },
    getcats() {
        return model.cats;
    },
    setCurrentcat(cat) {
        model.currentcat = cat;
    },
    incrementCounter() {
        model.currentcat.clickCount++;
        catView.render();
    },
};

// Vista
const catView = {
    init() {
    
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        this.catImageElem.addEventListener('click', this.clickHandler);

        this.render();
    },

    clickHandler() {
        return controller.incrementCounter();
    },

    render() {
        const currentcat = controller.getCurrentcat();
        this.countElem.textContent = currentcat.clickCount;
        this.catNameElem.textContent = currentcat.name;
        this.catImageElem.src = currentcat.imgSrc;
        this.catImageElem.style.cursor = 'pointer';
    },
};

const catListView = {
    init() {
      
        this.catListElem = document.getElementById('cat-list');

        this.render();
    },

    render() {
        let cat;
        let elem;
        let i;
       
        const cats = controller.getcats();

       
        this.catListElem.innerHTML = '';

    
        for(let i = 0; i < cats.length; i++) {
         
            cat = cats[i];

         
            elem = document.createElement('li');
            elem.className = 'list-group-item d-flex justify-content-between lh-condensed';
            elem.style.cursor = 'pointer';
            elem.textContent = cat.name;
            elem.addEventListener(
                'click',
                (function(catCopy) {
                  return function() {
                    controller.setCurrentcat(catCopy);
                    catView.render();
                  };
                })(cat)
              );
               
                this.catListElem.appendChild(elem);
        }
    },
};

controller.init();