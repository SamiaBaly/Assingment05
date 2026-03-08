
const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
const allCards = document.getElementById('all-cards');
const countCard = document.getElementById("count");
const loadingSpinner = document.getElementById("loadingSpinner");


const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const topBtnAll = document.querySelectorAll(".top-btn");


const newIssu = document.getElementById("new-issu");
const sarchInput = document.getElementById("sarch-input");
let searchList = [];

const toggleStyle = (id) => {
  fetch(url)
    .then(res => res.json())
    .then(json => {
      displayAllCards(json.data);
    });

  allBtn.classList.remove("bg-primary", "text-white");
  openBtn.classList.remove("bg-primary", "text-white");
  closedBtn.classList.remove("bg-primary", "text-white");


  allBtn.classList.add("bg-gray-200", "text-black");
  openBtn.classList.add("bg-gray-200", "text-black");
  closedBtn.classList.add("bg-gray-200", "text-black");

  const selected = document.getElementById(id);

  selected.classList.remove("bg-gray-200", "text-black");
  selected.classList.add("bg-primary", "text-white");

}


const filterCards = (ser) => {
  
  const filtered = searchList.filter(card =>
    card.title.toLowerCase().includes(ser) || card.description.toLowerCase().includes(ser)
  )
 
  displayAllCards(filtered);
};

newIssu.addEventListener('click', () => {
  const ser = sarchInput.value.toLowerCase();
  filterCards(ser);
  sarchInput.value = "";
});


const showLoding = () => {
  loadingSpinner.classList.remove("hidden");
  allCards.innerHTML = "";
};

const hiddeLoding = () => {
  loadingSpinner.classList.add("hidden");

}



const loadAllCards = () => {
  showLoding();
  fetch(url)
    .then(res => res.json())
    .then(json => {
      searchList = json.data;
      displayAllCards(searchList);
      hiddeLoding();
    });

};

const loadOpenCard = () => {
  showLoding();
  fetch(url)
    .then(res => res.json())
    .then(json => {
      const openCard = searchList.filter(card => card.status === "open");
      displayAllCards(openCard);
      hiddeLoding();

    });
};

const loadClosedCard = () => {
  showLoding();
  fetch(url)
    .then(res => res.json())
    .then(json => {
      const closedCard = searchList.filter(card => card.status === "closed");
      displayAllCards(closedCard);
      hiddeLoding();
    });
};

const loadCardDetail = async (id) => {
  const url2 = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url2)
  const details = await res.json();
  displayCardDetail(details.data);

};


const displayCardDetail = (card) => {
  console.log(card);
  const date = new Date(card.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "2-digit"
  });
  const detailsBox = document.getElementById("details-box");
  // const showdetail = details.data;
  detailsBox.innerHTML = `
  <h2 class="text-2xl font-bold">${card.title}</h2>
    <div class="flex flex-1 gap-2 my-2">
    ${card.status === "open" ? `<button class="border-0 bg-green-700 px-4 py-1 text-white rounded-2xl">Opened</button>` : `<button class="border-0 bg-red-700 px-4 py-1 text-white rounded-2xl">Closed</button>`}
      
      <div class="flex  items-center gap-1">
        <span class="w-3 h-3 bg-gray-500 rounded-full"></span>
        <p class="text-[#64748B]"><span>${card.status === "open" ? `<p>Opened</p>` : `<p>Closed</p>`}</span> by <span>${card.author}</span></p>
      </div>
      <div class="flex  items-center gap-2">
        <span class="w-3 h-3 bg-gray-500 rounded-full"></span>
        <p class="text-[#64748B]">${date}</p>
      </div>
    </div>

    <div class="flex gap-3 my-4">
      ${card.labels.map(label =>
    `<button class="px-2 py-1 rounded-3xl  ${label.toLowerCase() === "bug" ? `bg-red-100` :
      `bg-yellow-100`
    } text-error text-[12px]" >
                ${label.toUpperCase()}</button > `).join("")}
    </div>
    <p class="text-[#64748B] text-[16px] my-2">${card.description}</p>
    <div class="bg-base-200 rounded-lg grid grid-cols-2 justify-between p-4">
      <div class="text-[16px] ">
        <p class="text-[#64748B]">Assignee:</p>
        <h2 class="font-bold">${card.assignee}</h2>
      </div>
      <div class="text-[16px] text-left">
        <p class="text-[#64748B]">Priority</p>
        <button class=" ${card.priority.toLowerCase() === "high" ? "bg-red-100 text-red-600" :
      card.priority.toLowerCase() === "medium" ? "bg-yellow-100 text-yellow-600" :
        "bg-gray-100 text-gray-600"}  px-4 py-1 rounded-2xl btn">${card.priority}</button>
      </div>
    </div>
  `;
  document.getElementById("card_modal").showModal();
}


const displayAllCards = (cards) => {
  allCards.innerHTML = "";

  cards.forEach(card => {
    console.log(card);
    const date = new Date(card.updatedAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "2-digit"
    });
    const cardBox = document.createElement('div');
    cardBox.innerHTML = `
    <div onclick="loadCardDetail(${card.id})" class="h-full ${card.status === "open" ? `border-t-4 border-success` : `border-t-4 border-t-purple-600`} bg-base-100 shadow-md rounded-lg car">
          <div  class="shadow-md p-2">
            <div class="flex justify-between mb-4 items-center">
              <div>${card.status === "open" ? `<img src="./assets/Open-Status.png" alt="" class="w-[24px] h-[24px] ">` : `<img src="./assets/Closed- Status .png" alt="" class="w-[24px] h-[24px] ">`}</div>
              <button class="px-6 py-1 rounded-3xl  ${card.priority.toLowerCase() === "high" ? "bg-red-100 text-red-600" :
        card.priority.toLowerCase() === "medium" ? "bg-yellow-100 text-yellow-600" :
          "bg-gray-100 text-gray-600"} font-semibold">${card.priority.toUpperCase()}</button>
            </div>
            <div class="">
              <h1 class="text-[20px] font-semibold">${card.title}</h1>
              <p class="text-[16px] text-[#64748B] py-2 line-clamp-2">${card.description}</p>
            </div>
            <div class="flex gap-2 my-2 ">
            ${card.labels.map(label =>
            `<button class="px-2 py-1 rounded-3xl font-semibold  ${label.toLowerCase() === "bug" ? `bg-red-100` :
              `bg-yellow-100`
            } text-error text-[12px]" >
                ${label.toLowerCase() === "bug" ? `<i class="fa-solid fa-spider"></i> ${label.toUpperCase()}`: `<i class="fa-regular fa-life-ring"></i> ${label.toUpperCase()}`} </button > `).join("")}
            </div>
          </div>
          <div class="text-[#64748B] space-y-3 pt-4 px-2">
            <p>#${card.assignee}</p>
            <p>${date}</p>
          </div>
        </div>
    `;

    allCards.appendChild(cardBox);
  });
  countCard.innerText = cards.length;


};




loadAllCards();
setActive("allBtn");