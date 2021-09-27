const searchBtn = document.getElementById('search-btn')
const artistList = document.getElementById('work-of-art')

const artImage = document.querySelector('.art-img')
const artItem = document.querySelector('.art-item')
const imgModal = document.querySelector('.img-modal')
const closeModa = document.getElementById('img-close-btn')

const api = "https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key="

const key = "Q6Eq4lDv"
const artist = "&involvedMaker="









function getArtist() {


    let searchInputTxt = document.getElementById('search-input').value.split(/\s+/).join('+');
    console.log(searchInputTxt)

    fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=Q6Eq4lDv&q=${searchInputTxt}&involvedMaker`)

        .then(resp => resp.json())
        .then(data => {

            let html = "";
            // console.log(data)
            if (data.artObjects) {

                data.artObjects.forEach(art => {
                    console.log(art)

                    let webImg = (art.webImage) ? art.webImage.url : "https://kittytoken.io/assets/img/hero/hero-img.svg"

                    html += `
                    
                
                        <div class="art-item" data-id="${art.id}>
                                <div class="art-img">
                                      <a href="${webImg}" class='image' data-lightbox="${art}"
                                data-title="${art.title}"><img src="${webImg}" class='image' alt="${art.title}"></a>
                                
                                <div class="art-content">
                                        <div class="info-wrapper">
                                            <div class="art-author">
                                                <h3>${art.principalOrFirstMaker}</h3>
                                            </div>
                                            <div class="art-date">2137</div>
                                            </div>
                            <div class="desc-wrapper">
                                <div class="art-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ut facere, aspernatur reprehenderit quam consequatur alias debitis! Accusamus ipsam facere beatae id eius veritatis, possimus officia adipisci optio porro nisi eos, quod natus quos et consectetur itaque quasi rem odio consequuntur architecto commodi! Incidunt exercitationem id asperiores excepturi, necess
                                </div>
                                <button onclick ="readMore(this)" class="read-more btn">Czytaj więcej</button>
                            </div>
                       </div>
                        
                    </div>

                   

                `;
                });
                artistList.classList.remove('not-found')
            } else {
                html = "strona nie działa"
                artistList.classList.add('not-found')
            }
            artistList.innerHTML = html;



            // readmore 



            let noOfCharac = 150;
            let contents = document.querySelectorAll(".art-description")

            contents.forEach(content => {
                if (content.textContent.length < noOfCharac) {
                    content.nextElementSibling.style.display = "none"
                } else {
                    let displayText = content.textContent.slice(0, noOfCharac);
                    let moreText = content.textContent.slice(noOfCharac)
                    content.innerHTML = `${displayText}<span class="dots"> ... </span><span class="hide more">${moreText}</span>`;
                }
            })

        });


} function readMore(btn) {
    let post = btn.parentElement;
    post.querySelector(".dots").classList.toggle("hide");
    post.querySelector(".more").classList.toggle("hide");
    btn.textContent == "Czytaj więcej" ? btn.textContent = "Czytaj mniej" : btn.textContent = "Czytaj więcej";
}

searchBtn.addEventListener('click', getArtist);








// wyświetlanie modala (powiekszona)





// function getModal(e) {
//     e.preventDefault();
//     if (e.target.classList.contains('image')) {

//         let artItem = e.target.parentElement;

//         fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=Q6Eq4lDv&q=${artItem.dataset.id}`)
//             .then(resp => resp.json())
//             .then(data => { console.log(data) })


//     }
// }
// artistList.addEventListener('click', getModal);


// function artModal(art) {
//     art = art

//     let html = `
//                     <div class="img-modal">
//                     <div class="img-details">
//                         <div class="big-image">
//                             <img src="${art.artObjects.id}" alt="Picture from Rijksmuseum">
//                             <div type="button" class="img-close-btn btn" id="img-close-btn">
//                                 <i class="fas fa-times"></i>
//                             </div>
//                         </div>
//                         </div>
//                     </div>
//                 `;
//     imgModal.innerHTML = html;
//     imgModal.classList.add('show-modal')

// }


// pagination 












































// searchBtn.addEventListener('click', getArt);

// function getArt() {
//     let searchInputTxt = document.getElementById('search-input').value.trim();
//     fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=Q6Eq4lDv&involvedMaker=${searchInputTxt}`)
//         // fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=Q6Eq4lDv`)
//         .then(resp => resp.json())
//         .then(data => {
//             console.log(data)
//             let html = "";
//             if (data.artObjects) {
//                 data.artObjects.forEach(art => {
//                     console.log(data)
//                     html +=
//                         `
//                     <div class="art-item" data-id="${art.id}>
//                     <div class="art-content">
//                     <div class="art-img">
//                         <img src="${art.webImage}" alt="work of art">
//                     </div>
//                             <div class="info-wrapper">
//                                 <div class="art-author">
//                                     <h3>${art.principalOrFirstMaker}</h3>
//                                 </div>
//                                 <div class="art-date">${art.period}</div>
//                             </div>
//                             <div class="desc-wrapper">
//                                 <div class="art-description">${art.description}
//                                 </div>
//                                 <button class="read-more btn">Read More</button>
//                             </div>
//                         </div>
//                     </div>
//                     `;
//                 });
//             }else{
//                 html = "duuupaaaa"
//             }
//             artistList.innerHTML = html;
//         })


// }













// let html = ''
// if (data.artObjects) {
//     data.artObjects.forEach(art => {
//         html += `
//                     <div class="art-item" data-id="${art.id}>
//                         <div class="art-img">
//                             <img src="${art.webImage}" alt="work of art">
//                         </div>
//                         <div class="art-content">
//                             <div class="info-wrapper">
//                                 <div class="art-author">
//                                     <h3></h3>
//                                 </div>
//                                 <div class="art-date">1999</div>
//                             </div>
//                             <div class="desc-wrapper">
//                                 <div class="art-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                                     Quia
//                                     aliquid
//                                     cumque, voluptatum illum inventore provident autem. Nisi eveniet recusandae nihil.
//                                 </div>
//                                 <button class="read-more btn">Read More</button>
//                             </div>
//                         </div>
//                     </div>
//                   `
//     });
// }
// artistList.innerHTML = html;

// Rembrandt van Rĳn






