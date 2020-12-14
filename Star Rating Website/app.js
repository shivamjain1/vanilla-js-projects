const stars = document.querySelectorAll('.star');
const output = document.querySelector('.output');

// handle star click

for(let i=0; i<stars.length; i++){
    stars[i].starValue = i+1;

    ['click', 'mouseover', 'mouseout'].forEach((e) => {
        stars[i].addEventListener(e, showRating);
    })
}

function showRating(e) {
    let type = e.type;
    let starValue = this.starValue;

    stars.forEach((elem, ind) => {
        if(type === 'click'){
            if(ind < starValue){
                elem.classList.add('orange');
            } else{
                elem.classList.remove('orange');
            }

            if(starValue > 1){
                output.innerHTML = "You rated this " + starValue + " stars.";
            }
        }

        if(type === 'mouseover'){
            if(ind < starValue){
                elem.classList.add('yellow');
            } else{
                elem.classList.remove('yellow');
            }
        }

        if(type === 'mouseout'){
            elem.classList.remove('yellow');
        }
    });
}

function nextPage() {
    window.location.reload();
}