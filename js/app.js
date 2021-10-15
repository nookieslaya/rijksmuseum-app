const searchBtn = document.getElementById("search-btn")
const artistList = document.getElementById("work-of-art")

const input = document.getElementById("search-input")

const artDesc = document.querySelectorAll(".art-descriprion")
const artImage = document.querySelector(".image")
const artItem = document.querySelector(".art-item")
const imgModal = document.querySelector(".img-modal")
const closeModa = document.getElementById("img-close-btn")

const api = "https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key="
const key = "Q6Eq4lDv"
const artist = "&involvedMaker="

const pagination = document.querySelector(".pages")
const output = document.querySelector(".output")

let currentPage = 0
const ItemsPerPage = 7

class RijksMuseumDbDownloader {
	constructor(lang, key) {
		const allowedLanguages = ["en", "nl"]
		if (!allowedLanguages.includes(lang)) {
			console.log(`${lang} language not found - defaulting to english`)
			lang = "en"
		}
		this.api = `https://www.rijksmuseum.nl/api/${lang}/collection/`
		this.key = key
	}
	buildSearchUrl = searchQuery => {
		return this.api + `?involvedMaker&key=${this.key}&q=${searchQuery}`
	}

	buildDetailsUrl = objectNumber => {
		return this.api + `${objectNumber}?key=${this.key}`
	}
	getItems = async searchQuery => {
		try {
			const response = await fetch(this.buildSearchUrl(searchQuery))
			if (response.ok) {
				const data = await response.json()

				if (data.artObjects) {
					for (let i = 0; i < data.artObjects.length; i++) {
						// foreach doesnt support async await well hence we're using classic for loop
						const art = data.artObjects[i]
						art.details = await this.getObjectDetails(
							art.objectNumber
						)
					}
				}
				return { ...data, ok: true }
			}
			console.log(
				`RijksMuseumDbDownloader/getItems: response not ok - ${response.status}`
			)
			return { ok: false, status: response.status }
		} catch (error) {
			console.error(
				`error while fetching data in RijksMuseumDbDownloader/getItems: \n${error}`
			)
			return { ok: false, status: null }
		}
	}
	getObjectDetails = async objectNumber => {
		try {
			const response = await fetch(this.buildDetailsUrl(objectNumber))

			if (response.ok) {
				const data = await response.json()
				return data
			}
			return {}
		} catch (error) {
			console.log(
				`RijksMuseumDbDownloader/getObject details - error while downloading details for ${objectNumber}`
			)
			return {}
		}
	}
}

const DB = new RijksMuseumDbDownloader("en", "Q6Eq4lDv")

async function getArtist() {
	let searchInputTxt = document
		.getElementById("search-input")
		.value.split(/\s+/)
		.join("+")
	console.log(searchInputTxt)

	let data = await DB.getItems(searchInputTxt)
	console.log("data", data)

	let html = ""

	if (data.artObjects) {
		data.artObjects.forEach(art => {
			let date = ""
			let description = ""
			console.log("details: ", art.details)
			if (
				art &&
				art.details &&
				art.details.artObject &&
				art.details.artObject.description
			) {
				console.log("has description")
				description = art.details.artObject.description
				date = art.details.artObject.dating.presentingDate
			} else {
				description = "brak danych"
				date = "brak danych"
			}

			let webImg = art.webImage
				? art.webImage.url
				: "https://kittytoken.io/assets/img/hero/hero-img.svg"

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
                                            <div class="art-date">${date}</div>
                                        </div>
                            <div class="desc-wrapper">
                                    <div class="art-description">
                                    ${description}
                                </div>
                                <button onclick ="readMore(this)" class="read-more btn">Czytaj więcej</button>
                            </div>
                           </div>
                          
                    </div>
                   
                    `
		})

		artistList.classList.remove("not-found")
	} else {
		html = "Nie znaleziono artysty"
		artistList.classList.add("not-found")
	}

	artistList.innerHTML = html

	// readmore

	let noOfChar = 150
	let contents = document.querySelectorAll(".art-description")

	contents.forEach(content => {
		if (content.textContent.length < noOfChar) {
			content.nextElementSibling.style.display = "none"
		} else {
			let displayText = content.textContent.slice(0, noOfChar)
			let moreText = content.textContent.slice(noOfChar)
			content.innerHTML = `${displayText}<span class="dots"> ... </span><span class="hide more">${moreText}</span>`
		}
	})

	
}

// readmore cd

function readMore(btn) {
	let post = btn.parentElement
	post.querySelector(".dots").classList.toggle("hide")
	post.querySelector(".more").classList.toggle("hide")
	btn.textContent == "Czytaj więcej"
		? (btn.textContent = "Czytaj mniej")
		: (btn.textContent = "Czytaj więcej")
}

searchBtn.addEventListener("click", getArtist)

//enter click
const enterCheck = e => {
	if (e.key == "Enter") {
		getArtist()
	}
}
input.addEventListener("keyup", enterCheck)
