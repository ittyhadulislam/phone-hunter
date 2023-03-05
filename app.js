const loadData = async (search_phone, data_limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search_phone}`
    const response = await fetch(url)
    const data = await response.json()
    displayData(data.data, data_limit)
}

const displayData = (phone_details, data_limit) => {
    // console.log(phone_details)
    const cards = document.getElementById('cards')
    cards.innerText = ''
    const show_button = document.getElementById('show-all-button-div')

    if (data_limit && phone_details.length > 6) {
        phone_details = phone_details.slice(0, 6)
        show_button.classList.remove('hidden')
    }
    else {
        show_button.classList.add('hidden')
    }

    const alert = document.getElementById('alert-message')

    if (phone_details.length === 0) {
        alert.classList.remove('hidden')
    }
    else {
        alert.classList.add('hidden')
    }

    phone_details.forEach(card => {
        // console.log(card.image)
        const card_div = document.createElement('div')
        card_div.classList.add('block', 'max-w-sm', 'rounded-lg', 'bg-white', 'shadow-lg', 'dark:bg-neutral-700', 'border')
        card_div.innerHTML =
            `
            <a href="#!" class="flex justify-center items-center p-5">
                <img class="rounded-t-lg" src="${card.image}" alt="" />
            </a>
                <div class="p-6">
                    <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    ${card.phone_name}
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        ${card.slug}
                    </p>
                    <button type="button" onclick = "openModal('${card.slug}')"
                        class="inline-block rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-toggle="modal" data-te-target="#exampleModalCenteredScrollable" data-te-ripple-init data-te-ripple-color="light">
                        Button
                    </button>
                </div>
        `
        cards.appendChild(card_div)
    })

    loadSpinner(false)

}


// search filed and show all cards button 

const searchOperation = (data_limit) => {
    loadSpinner(true)
    const input = document.getElementById('input-field')
    const input_value = input.value
    // console.log(input_value)
    loadData(input_value, data_limit)

    // input.value = ''
}



const searchItem = () => {
    searchOperation(6)
}

const searchItemWithEnter = (event) => {
    // console.log(event.key)
    if (event.key === 'Enter') {
        searchOperation(6)
    }
}
const button = document.getElementById('search-button')
button.addEventListener('click', searchItem)

const b = document.getElementById('input-field')
b.addEventListener('keypress', searchItemWithEnter)




const showAllButton = () => {
    searchOperation()
}
const showButton = document.getElementById('show-button')
showButton.addEventListener('click', showAllButton)



// spinner loading

const loadSpinner = isLoading => {
    const spinner = document.getElementById('spinner')

    if (isLoading) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden')
    }
}

// show details with modal

const openModal = async slug => {
    url = `https://openapi.programming-hero.com/api/phone/${slug}`
    const response = await fetch(url)
    const data = await response.json()
    showDetails(data.data)
}

const showDetails = async (details) => {
    // image 
    const image = document.getElementById('image-thumb')
    image.src = details.image
    // main features
    const title = document.getElementById('modal-title')
    title.innerText = details.name
    const brand_name = document.getElementById('brand-name')
    brand_name.innerText = details.brand
    const release_date = document.getElementById('release-date')
    release_date.innerText = details.releaseDate
    const storage = document.getElementById('storage')
    storage.innerText = details.mainFeatures.storage
    const memory = document.getElementById('memory')
    memory.innerText = details.mainFeatures.memory
    const display_size = document.getElementById('display-size')
    display_size.innerText = details.mainFeatures.displaySize
    const chip_set = document.getElementById('chipset')
    chip_set.innerText = details.mainFeatures.chipSet
    const sensors = document.getElementById('sensors')
    sensors.innerText = details.mainFeatures.sensors

    // others
    const wlan = document.getElementById('wlan')
    wlan.innerText = details.others.WLAN
    const bluetooth = document.getElementById('bluetooth')
    bluetooth.innerText = details.others.Bluetooth
    const gps = document.getElementById('gps')
    gps.innerText = details.others.GPS
    const nfc = document.getElementById('nfc')
    nfc.innerText = details.others.NFC
    const radio = document.getElementById('radio')
    radio.innerText = details.others.Radio
    const usb = document.getElementById('usb')
    usb.innerText = details.others.USB

    //slug
    const slug = document.getElementById('slug')
    slug.innerText = details.slug


    // console.log(details)
}

loadData("oppo")