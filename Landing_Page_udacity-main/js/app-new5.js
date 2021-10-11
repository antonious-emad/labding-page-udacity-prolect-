// define Global Variables

const getAllSections = document.querySelectorAll("section");
const tabs = document.getElementById('navbar__list');
const fregment = document.createDocumentFragment();
/// define the option should be follow for IntersectionObserver
let options = {
    root: null,
    rootMargin: '-60px',
    theshold: 0.1
}

/// arrow funtion applied for callback of IntersectionObserver.
let setItemActive = (entries => {
    entries.forEach (entry => {
        getAllSections.forEach( (item)=> { 
            
            if (item.classList.contains("your-active-class")){
            item.classList.remove("your-active-class"); 
            entry.target.style.background = "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)";

            }
            
            });
         // put if condition if the inetersection is already done, so add class name "your-active-class" and define special background color
        if(entry.isIntersecting) {
            entry.target.classList.add('your-active-class')
            entry.target.style.background ="linear-gradient(0deg, rgba(200,200,200,250) 0%, rgba(200,200,200,0) 100%)";
            const activeNav = entry.target.getAttribute("data-nav");
            console.log (activeNav)
            currentLi = document.querySelectorAll("li");
            currentLi.forEach ( (existLi) => {
                if (existLi.innerText ==activeNav){
                    existLi.classList.add('your-active-class');
                } else {
                    existLi.classList.remove('your-active-class');
                }
            })

        } 
        // if not , so remove the  class name "your-active-class" which was added before and return background color to default
        // else {
        //     entry.target.classList.remove('your-active-class')
        //     entry.target.style.background = "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)";

        // }
    })
});
/// define the Intersection Observer API
const observer = new IntersectionObserver (setItemActive, options);


/// start run the code
start();


///define start code to be run and take an action
function start() {
    let newLink = document.createElement ("li");
    /// start for each loop and take each section and put it in name the section and its index+1
    getAllSections.forEach((section, index) => {
        newLink = contentLink(section.dataset.nav, index+1);
        fregment.appendChild(newLink);
        console.log(fregment);
        //// activate the oberver to take an action based on current section
        newLink.addEventListener ("click", (exc) => {
            exc.preventDefault();
            section.scrollIntoView({behavior:"smooth"});
        });
        observer.observe(section);
      })
      tabs.appendChild(fregment);
      console.log(tabs);
}



/// define fuction to create default link to be used when running forEach loop for this each section 
function contentLink(itemName, index) {
    const newList = document.createElement ("li");
    const newLink = document.createElement ("a");
    newLink.setAttribute('href', `#section${index}`);
    newLink.classList.add('menu__link');
    newLink.appendChild(document.createTextNode (`${itemName}`));
    newList.appendChild(newLink);
   console.log(newLink);
    console.log(newList);
    return newList;
}
