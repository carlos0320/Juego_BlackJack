let array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'f', 'a', 'b', 'c', 'd', ];


function revolverArray(array) {

    let aleatorios = [];
    let newArray = [];
    let numeroAleat = Math.floor(Math.random() * (array.length));
    aleatorios[0] = Math.floor(Math.random() * (array.length));
    let repetido = false;

    for (let i = 1; i < array.length; i++) {
        aleatorios[i] = Math.floor(Math.random() * (array.length));
        for (let j = 0; j < i; j++) {
            if (aleatorios[i] === aleatorios[j]) {
                i--;
            }
        }


    }
    console.log(aleatorios);
}
revolverArray(array);