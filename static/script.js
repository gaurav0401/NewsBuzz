const API_KEY = "3b5d061b34504bff92c7548aeb68b8a1";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load' , ()=> fetchNews('Trending'))


async function fetchNews(query){

        const res = await fetch(`${url}${query}&apikey=${API_KEY}`)
        const data=await  res.json();
        const current=document.getElementById('current-slug');
      
       
            // current.innerHTML=`Showing results for : <b>${query}</b> category `;
            current.innerHTML=`<b>${query}</b> `;
    

        bindData(data.articles);
} 


function bindData(articles){

    const cardsContainer= document.getElementById('cards-container');
    const template=document.getElementById('template-news-card');
    cardsContainer.innerHTML='';
    articles.forEach(element => {
        if (!element.urlToImage) return ;
          
        const cardClone = template.content.cloneNode(true);

        fillData(cardClone , element);
        cardsContainer.appendChild(cardClone);
    });

}


function fillData(cardClone , element){

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    const time = cardClone.querySelector('#time');
    const gotTOUrl = cardClone.querySelector('#go-to-url');
  
    newsImg.src= element.urlToImage;
    newsTitle.innerHTML=element.title;
  
    newsDesc.innerHTML=element.description;
    const date = new Date (element.publishedAt).toLocaleString("en-US" , {timeZone: "Asia/Jakarta"})
    newsSource.innerHTML=`${element.source.name} - ${date}`;

    gotTOUrl.href=element.url;
};


function onNav(id){
    const current=document.getElementById('current-slug');
    if (id=="Home"){
        current.innerHTML="";
    }
    fetchNews(id);
}




const  searchButton = document.getElementById('search-button');
const searchText= document.getElementById('search-text');


searchButton.addEventListener('click' , ()=>{

    const query=searchText.value ;
    if (!query) return;
     fetchNews(query);
})



const items = document.querySelectorAll('.nav-link');

items.forEach((item, idx) => {  
  item.addEventListener('click', () => {   
    ToggleActive(item,idx);
  });
});

function ToggleActive(el,index) {
  el.classList.toggle('active');
  items.forEach((item,idx) => {
    if(idx !== index){
      item.classList.remove("active");
    }
  });
}


function reload(){
  window.location.reload();
}